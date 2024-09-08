---
title: Debugging is Experimenting
created: 2023-05-10 00:53:14
categories: [ChitChat]
tags: [zh-Hans-CN]
---

<!-- block -->
在 Telegram 的 Rust 群里经常会有群友问出各式各样的问题，其中有很大一部分在我看来是可以通过更简单直接的方法解决的。前段时间简单的总结了一下这类问题和解决方法，今天展开来说说。
<!-- block -->

## TL;DR

- 获取信息
- 提出假设
- 试错
- 重复

## Debugging is Experimenting

这句标题的意思是，在我看来，调试的过程实际上很像是做实验——或者更普遍的——做研究的过程。在遇到一个问题时，你首先应该做的是尽量收集信息，接着提出假设并验证假设，如此重复直到得到正确答案。

考虑这个例子（这是一个今天在群里发生的现实中的例子）：

> 你正在使用 Rust 写一个程序，其中用到了 [Regex](https://docs.rs/regex) 这个库。现在代码中有这样一段：
>
> ```rust
> let url_pattern = r"^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$";
>
> let re = Regex::new(url_pattern).unwrap();
> re.is_match(url)
> ```
>
> 这段代码在你家里的电脑里运行良好，但是当你把代码放到公司电脑上运行的时候，却总是报错：
>
> ```bash
> regex parse error:
>     ^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$
>                   ^^
> error: unrecognized escape sequence
> ```
>
> 你感到非常困惑。这时你想起来也许谷歌能帮到你，于是通过搜索找到了这篇 [Stackoverflow上的问题](https://stackoverflow.com/questions/62862372/regular-expression-doesnt-work-in-rust-whats-wrong)。根据回答者的说法，Rust 的 Regex 库并不支持对于 `/` 的转义，所以你需要把正则表达式中的 `\/` 改成 `/`。但是你仍然不理解为什么自己的电脑上能够正常编译运行。作为老生常谈的一步，在提出问题之前你想到你应该首先试图在所有相关的地方搜集信息。其中，Github 的 issue 区乃是重中之重。于是你在 Regex 库的 issue 区里搜索了一下，发现了这个 [issue](https://github.com/rust-lang/regex/issues/501)。这是一个五年前年的 issue，目的在于允许一些无效的转义字符，并且在三个月前被[合并](https://github.com/rust-lang/regex/commit/fe8d6673d3eaa512535d268c8e9d7cf42cd06a10)后随 Regex 1.8.0 版发布。

现在，你已经获得了足够的信息——你了解到了为什么你的代码会报错，也知道了你的代码为什么不会报错。但问题依然存在，也即，为什么同样的项目配置在不同的电脑上表现出的行为不一致？你提出了假设：

> 因为不明原因，公司电脑仍在使用 1.7.x 版本的 regex，但家中电脑已经升级到了 1.8.0 版本。

你证实了自己的猜想：

```bash
$ cargo tree -i regex
regex v1.8.1
```

::: tip
使用 `cargo tree` 获取由上至下的依赖树，并使用 `cargo tree -i $SPEC` 获取由下至上的反向依赖树。
:::

但，由于缺课的你没有认真阅读 [Cargo 文档](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html)，你并不知道 `Cargo.toml` 中如果依赖版本不加符号默认行为是 `^` 而不是 `=`，这与 npm 不同。现实中，群友在这里为你指出了这个问题。但假设你没有这么幸运，你会怎么做呢？没错，继续收集更多的信息。以下都是在软件开发中常用的获取信息的方法：

- 继续尝试不同的参数/环境/配置并观察行为
- 阅读文档
- 搜索 Github issue
- 搜索 Stackoverflow
- 搜索 其他论坛（包括 reddit 或 rust user forum 等）
- 阅读代码（实现及注释）
- 使用各类调试工具

## When experimenting is not enough

但，有些时候，即使你已经尽力收集了所有的信息，你仍然无法解决问题。这时，你需要尝试一些其他的方法。其中，咨询他人是最常用的方法之一。关于如何正确的提问，也已经[老生常谈](https://github.com/selfteaching/How-To-Ask-Questions-The-Smart-Way/blob/master/How-To-Ask-Questions-The-Smart-Way.md)。但，实际上，询问他人并不是一种「高效」的方法。这需要他人恰好了解你所遇到的问题并愿意回答。通常来讲，大部分问题都是通过上述方式即可自行解决的。学会什么时候提问，什么时候自己解决问题能够极大的提高效率。
