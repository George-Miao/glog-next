---
title: Pin 和 Unpin，以及为什么 Rust 需要它们
created: 2021-08-27 00:24:50
categories: [Translate, Tutorial]
tags: [zh-Hans-CN, Rust]
---

本文翻译自 [Pin, Unpin, and why Rust needs them](https://blog.adamchalmers.com/pin-unpin/)

<!-- block -->

通常来讲，使用 async Rust 库是一件非常简单的事情。你只需要加一些 `async` 或者 `.await` 即可。然而写一个你自己的 async 库就是不是一件简单的事情了。我第一次尝试的时候，经常被一些像是 `T: ?Unpin` 和 `Pin<&mut Self>` 这样的晦涩难懂的语法搞晕。我从来没见过这样的东西，也不理解它们到底是干什么的。现在我逐渐理解一切，所以写了这篇文章来解释，要是我以前学习的时候也有这么一篇文章就好了。

<!-- block -->

在这篇文章里，我们会了解

- 什么是 Futures
- 什么是自指类型
- 为什么这种类型是不安全的
- `Pin` / `Unpin` 是怎么让它们变得安全的
- 怎么使用 `Pin` / `Unpin` 来写一些复杂的嵌套 Futures

## 什么是 **Futures**

几年前，我需要一个可以运行一些 async 函数并且做一些统计的东西，例如计算这些 async 函数运行了多久。我想要一个大概看起来长成这样的 `TimedWrapper`

```rust
// 首先是一些 async 函数，使用 [https://docs.rs/reqwest] 来爬一个链接
// 记住，这些函数（或者说 Future）在被 `.await` 或 poll 之前什么都不会做
// 所以它们并不会真的发出一个 HTTP 请求
let async_fn = reqwest::get("http://adamchalmers.com");

// 使用我们假想的 TimedWrapper 把它们包起来
let timed_async_fn = TimedWrapper::new(async_fn);

// 现在对这个函数使用 `.await`，这样它才能发出 HTTP 请求，同时计时
let (resp, time) = timed_async_fn`.await`;
println!("Got a HTTP {} in {}ms", resp.unwrap().status(), time.as_millis())
```

很有精神。这个接口的设计应该对于我团队里的其他成员都很容易理解和使用。那现在我们就来实现它吧！已知的情报：在底层，Rust 的 async 函数其实就是普通的函数，只不过它们都会返回 `Future`。`Future` trait 很简单，它代表一个类型：

- 可以被 poll
- 当它被 poll 的时候，可能返回的有 `Pending` 和 `Ready`
- 如果它还是 `Pending`，也就是未完成，你后面还需要再继续 poll 它
- 如果它是 `Ready`，也就是完成状态，它会返回一个结果值。我们称这个行为为 `resolving`（解决的）

我们可以使用一个非常简单的实现 `Future` 的例子

```rust
use std::{future::Future, pin::Pin, task::Context}

/// 一个返回随机数的 Future
#[derive(Default)]
struct RandFuture;

impl Future for RandFuture {
    // 每个 Future 都需要指定它们的返回类型
    // 这个 Future 返回一个 u16
    type Output = u16;

    // `Future` trait 只需要实现一个方法，叫做 `poll`
    fn poll(self: Pin<&mut Self>, _cx: &mut Context) -> Poll<Self::Output> {
        Poll::ready(rand::random())
    }
}
```

简单！我觉得我们已经可以去实现 `TimedWrapper` 了。

## 嵌套 Futures：尝试失败

首先我们可以定义一个类型：

```rust
pub struct TimedWrapper<Fut: Future> {
    start: Option<Instant>,
    future: Fut,
}
```

好，`TimedWrapper` 通过接受一个类型 `Fut` 来实现泛型，并且这个类型必须是 `Future`。然后它会把这个 future 保存在一个字段里。同时，它还有一个叫做 `start` 的字段来记录第一次被 poll 的时间。然后我们给它写一个构造方法：

```rust
impl<Fut: Future> TimedWrapper<Fut> {
    pub fn new(future: Fut) -> Self {
        Self { future, start: None }
    }
}
```

没有什么太复杂的东西。`new` 方法接受一个 future，把它包起来放在 `TimedWrapper` 里。当然，我们还得把 `start` 设置为 `None`，因为它还没有被 poll 过。现在，为了让它可以被 `.await`，我们需要实现 poll 方法，也就是 `Future` 唯一需要实现的方法。

```rust
impl<Fut: Future> Future for TimedWrapper<Fut> {
    // 这个 future 会输出一对值：
    // 1. 内部 future 的输出
    // 2. 内部 future 解析所消耗的时间
    type Output = (Fut::Output, Duration);

    fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Self::Output> {
        let start = self.start.get_or_insert_with(Instant::now);
        let inner_poll = self.future.poll(cx);
        let elapsed = self.elapsed();

        match inner_poll {
            // 内部 future 还需要一些时间，所以这个 future 也需要更多时间
            Poll::Pending => Poll::Pending,
            // 完成！
            Poll::Ready(output) => Poll::Ready((output, elapsed)),
        }
    }
}
```

所有东西都很简单顺畅，除了一个问题：它不工作 (It doesn't work)^TM^。

![](https://blog.adamchalmers.com/pin-unpin/poll_err.webp)

Rust 编译器报了一个关于 `self.future.poll(cx)` 的错：

> error[E0599]: no method named \`poll\` found for type parameter \`Fut\` in the current scope

也就是说在 `Fut` 类型上这个叫做 `poll` 的方法不存在。奇怪，因为我们知道 `Fut` 是一个 `Future`，那它肯定有 `poll` 方法啊？我们继续看下去。Rust 编译器在后面放了两句提示，说虽然 `Fut` 没有 `poll` 方法，但是 `Pin<&mut Fut>` 有。这又是个什么奇怪的类型？

我们知道方法（与函数不同）都有一个 “接收器”，也就是可以访问到自己的办法。这个 “接收器” 可以是 `self`， `&self` 或者 `&mut self`，分别代表 “获得自己的所有权”，“借用自己”，“可变借用自己”。因此这只是一个新的，我们不曾熟知的接收器类型。之所以 Rust 会抱怨是因为我们只有一个 `Fut`，而我们真正需要的是 `Pin<&mut Fut>`。现在，我有两个问题：

1. 什么是 `Pin`？
2. 如果 `T` 是一个值，我怎么才能获得一个 `Pin<&mut T>`？

从现在开始，这篇文章会回答这两个问题。我会解释一些在 Rust 可能导致不安全的代码，以及为什么 Pin 可以安全地解决这些问题。

## 自指类型是不安全的

之所有 `Pin` 存在是为了解决一个特定的问题：自指类型，也就是包含有指向了自身的指针的类型。举个例子，一个二叉查找树可能含有一个自指的指针，指向了同一棵树下的另一个节点。

自指类型可以非常有用，但是它们也使得我们很难保证内存安全。想要理解，我们可以使用这个类型作为例子。它有两个字段，一个叫做 `val` 的 i32 和一个叫做 `pointer` 的指向 i32 的指针。

![](https://blog.adamchalmers.com/pin-unpin/memory_before.webp)

到目前位置，一切都还安好。 `pointer` 字段指向在内存地址 A 的 `val` 字段，存有一个有效的 i32。这些指针都是 **有效的** ，意味着这些指针所指向的内存确实可以被转换成正确的类型（在这里是 i32）。但是 Rust 编译器经常会把值在内存中四处移动。举个栗子，如果我们把这个结构体传到了某个函数里，它可能会被移动到一个不同的内存地址。或者我们可能会把它装箱放到堆内存上去。又或者这个函数被存放在 `Vec<MyStruct>` 中，于是当我们想要往这个 Vec 里放更多值的时候，它可能会超出它的容量并需要把它的元素移动到一个新的，更大的缓冲区里去。

![](https://blog.adamchalmers.com/pin-unpin/memory_after.webp)

当我们移动它的时候，结构体的字段的地址也会被改变，但是它们的值不会。因此 `pointer` 字段仍然指向原来的地址 A，但是地址 A 现在不再存有一个有效的 i32。那里原有的数据被移动到了地址 B，而且某些新的数据可能被写入到了地址 A！于是现在指针不再有效。情况不妙！在最好的情况下，无效的指针会引起程序崩溃，而最坏的情况下这可能会变成一个可破解的漏洞。我们希望只允许这类内存不安全的代码存在 `unsafe` 块内，并且非常小心的记录这个类型，告诉用户在移动后及时更新指针。

## Unpin 和 !Unpin

简单概括来讲，所有的 Rust 类型都可以被划分进两个分类：

1. 可以被安全地在内存中移动的类型。这是默认且普遍的。例如所有的基本类型像是数字，字符串，布尔值，还有所有由这些类型组成的结构体和 enum。大部分的类型都在这个类别内！
2. 自指类型，也就是不能被安全地在内存中移动的类型。这类类型是很罕见的。一个例子是 [tokio 内部使用的一些介入式链表](https://docs.rs/tokio/1.10.0/src/tokio/util/linked_list.rs.html)。还有就是大部分实现了 `Future` 的类型和借用的数据。原因在 [Rust async book](https://rust-lang.github.io/async-book/04_pinning/01_chapter.html) 中有很好地被解释。

在内存中移动分类 1 中的类型是完全安全的。你不会因为移动这些类型导致任何指针失效。但是如果你想要移动分类 2 中的类型，你会导致像是我们刚才看到的指针失效并且引发 UD。在早期的 Rust 版本中，你需要非常小心地使用这些类型才能保证它们不会被移动，又或者当你移动了它们的时候，你需要使用 `unsafe` 来更新所有的指针。不过在 Rust 1.33 后，编译器可以自动识别类型所在的分类，并且保证它们的安全性。

任何在分类 1 中的类型都会被自动实现一个叫做 `Unpin` 的 trait。名字怪怪的，但是它的含义很快你就会明白了。再重复一遍，大部分的 **普通** 类型都实现了 `Unpin`，并且因为这是一个自动 trait（像是 `Send`，`Sync` 或者 `Sized`[^1]），你不需要费心手动实现它。如果你不确定你的类型可不可以被安全地移动，你可以在 [docs.rs](https://docs.rs/) 上看看它有没有实现 `Unpin`！

[^1]: 好吧其实 `Sized` 并不是一个自动 trait，但是基本上它是，因为这在编译器里是个特例。更多原因参见 [这个讨论](https://github.com/pretzelhammer/rust-blog/issues/28)。

而在分类 2 中的类型被（非常有创意地）命名为 `!Unpin` （trait 名中的 `!` 符号的意思是 “没有实现” ）。想要安全地使用这些类型，我们不能使用普通的指针来实现自指。作为替代，我们使用一种特殊的指针，一种可以把值 “定” 在原地，保证它们不会被移动的指针。这就是为什么 `Pin` 类型存在。

![](https://blog.adamchalmers.com/pin-unpin/pin_diagram.webp)

Pin 把一个指针包裹起来来保证它的值不会被移动。唯一的例外是当它的值实现了 `Unpin` —— 那我们就知道了它可以被安全移动。芜湖！现在我们可以安全地写一个自指结构啦！这是非常重要的，就像我们在上面讨论过的，很多 Future 都是自指的，而我们需要它们来实现 async/await。

## 使用 Pin

我们现在理解了为什么 Pin 存在，以及为什么我们的 Future poll 方法会使用一个 pinned `&mut self` 来取代普通的 `&mut self`。现在我们可以回到我们原来的问题：我需要一个指向内部 future 的引用。或者，更宽泛地来讲，我们现在有了一个 pinned 结构体，我们怎么才能访问到它的字段？

解决的方案是使用一些助手函数来让你拿到对字段的引用。这些引用可能是普通的 Rust 引用，像是 `&mut`，又或者 **依然** 是 pinned。你可以选择你需要使用哪个。这被称之为 **“投影”** (projection)：如果你有一个 pinned 结构体，你可以写一个投影方法使你可以访问到它的所有字段。

投影说到底只是从 Pin 中获取或者修改数据。举个栗子，我们现在有一个获取自 `Pin<&mut self>` 的 `start: Option<Duration>` 字段，以及我们需要把一个 `future: Fut` 放进这个 Pin 里，如此我们才能调用 `poll` 方法。如果你读过 [官方文档中的 Pin 方法](https://doc.rust-lang.org/stable/std/pin/struct.Pin.html) 你就知道如果它指向一个 Unpin 的值，那它就是安全的，要不然你就需要 `unsafe` 了。

```rust
// 把值传进 Pin
pub        fn new          <P: Deref<Target:Unpin>>(pointer: P) -> Pin<P>;
pub unsafe fn new_unchecked<P>                     (pointer: P) -> Pin<P>;

// 从 Pin 里获取值
pub        fn into_inner          <P: Deref<Target: Unpin>>(pin: Pin<P>) -> P;
pub unsafe fn into_inner_unchecked<P>                      (pin: Pin<P>) -> P;
```

我知道 `unsafe` 看起来很吓人，但是其实写 unsafe 代码是没有关系的！我把 unsafe 想做是编译器在说 “嘿！我没办法分辨这段代码到底守不守规矩，所以我需要你来帮我检查一下。” Rust 编译器已经很累了，有的时候我们也需要帮编译器干一点活。如果你想要学着写一些自己的投影方法，我强烈推荐关于这方面的 [这篇来自 fasterthanli.me 的博客文章](https://fasterthanli.me/articles/pin-and-suffering)。不过我们可以稍微走一些捷径。

## 使用 pin-project 来替代

好，恩，听着，我需要做一些忏悔：我不喜欢用 `unsafe`。我知道我刚才才解释过为什么我们可以用它，但是，即便如此，

![](https://blog.adamchalmers.com/pin-unpin/zizek_no.webp)

> 我就不

我写 Rust 不是因为我想要思前顾后，淦，我只是想要写一点又快又好的东西。幸运的是，有人对此深表同情于是写了个库，可以用来生成完全安全的投影！这个超棒的库叫做 [pin-project](https://docs.rs/pin-project)。我们只需要更改一下我们的定义：

```rust
#[pin_project::pin_project] // 这会生成一个 `project` 方法
pub struct TimedWrapper<Fut: Future> {
    // 对于每一个字段，我们需要选择 `project` 方法是返回
    // 一个 &mut T 还是 Pin<&mut T> 引用
    // 默认是没有 pinned 的，也就是 &mut T：
    start: Option<Instant>,
    // 你也可以用这个属性来启用 pinned 引用：
    #[pin]
    future: Fut,
}
```

对于每一个字段，你必须选择这是不是一个 pinned 投影。默认情况下，你应该使用普通的引用，因为使用它们更轻松简单。不过如果你知道你需要一个 pinned 引用 —— 比如你需要调用 `.poll()`，而它的接收器是 `Pin<&mut Self>` —— 那你可以通过 `#[pin]` 来做到。

现在我们终于可以 poll 内部的 future 啦！

```rust
fn poll(self: Pin<&mut Self>, cx: &mut Context) -> Poll<Self::Output> {
    // 这个方法返回一个拥有完全相同的字段的类型
    // 除了那些被 #[pin] 标注的字段
    let mut this = self.project();

    let start = this.start.get_or_insert_with(Instant::now);
    let inner_poll = this.future.as_mut().poll(cx);
    let elapsed = start.elapsed();

    match inner_poll {
        // 内部 future 还需要一些时间，所以这个 future 也需要更多时间
        Poll::Pending => Poll::Pending,
        // 完成！
        Poll::Ready(output) => Poll::Ready((output, elapsed)),
    }
}
```

终于，我们的目标达成了 —— 而且我们完全没有用到 unsafe 代码！

## 总结

如果一个 Rust 的类型涉及到自指指针，那它就不能被安全地移动。毕竟移动并不会更新指针，所以它们还会指向老的内存地址，于是它们就失效了。Rust 可以自动识别哪些类型可以被安全地移动并自动给它们实现一个 Unpin trait。如果你有一个 pinned 指针指向一些数据，Rust 可以保证没有任何不安全的事情发生（如果移动它是安全的，那么你可以这么做，反之你将不能）。这很重要，因为很多 future 类型都是自指的，所以我们需要 Pin 来安全地 poll 一个 future。你可能不需要手动 poll 一个 future（直接用 async/await 替代），但是如果你需要，那 [pin-project](https://docs.rs/pin-project) 可以帮助你简化很多操作。

我希望这篇文章能帮到你 —— 如果你有任何问题，可以通过 [原作者的 twitter](https://twitter.com/adam_chal) 联系他或者 [译者的 email](mailto:gm@miao.dev) 联系译者。如果你想和原作者沟通来找份工作，~~那为啥你在看这篇译文，还不去看原文？~~ 他所在的 Cloudflare 的团队正在招人，通过 npunyzref@pybhqsyner.pbz (apply ROT13) 联系他。

## 参考

- Complete TimedWrapper example code on [GitHub](https://github.com/adamchalmers/nested-future-example/blob/master/src/main.rs)
- This post is based on a [presentation](https://cloudflare.tv/event/2F1zRnM58eBCSHP2VEd74x) I gave at a Rust Bay Area meetup a few weeks ago. My talk starts around 40 minutes in.
- The [std::pin docs](https://doc.rust-lang.org/stable/std/pin/index.html) have a pretty good explanation of Pin's details.
- The [Rust async book](https://rust-lang.github.io/async-book/04_pinning/01_chapter.html) explains why Futures often need self-referential pointers.
- Comprehensive article on [how pin projection actually works](https://fasterthanli.me/articles/pin-and-suffering) by [@fasterthanlime](https://twitter.com/fasterthanlime/)
- Great article explaining [when and how Rust moves values to different memory addresses](https://hashrust.com/blog/moves-copies-and-clones-in-rust/), by [@HashRust](https://twitter.com/hashrust)
