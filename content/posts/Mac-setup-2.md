---
title: An Apple a day, keep the doctor away
categories: [ChitChat]
tags: [zh-Hans-CN, WIP]
created: 2022-02-02 16:06:33
---

陆陆续续已经用了新 Macbook Pro 两个月了，优点很多，缺点也有。在这台 Macbook Pro 2021 上，我彻底重写了我的博客，而这篇文章就是我重写博客后的第一篇。那么今天就来简单讲讲我到现在为止的使用体验。

<!-- more -->

## 开发体验

M1 系列的 MBP 我目前碰到的最大的问题就是 Docker。由于 Docker headless 在 M1 上似乎一直有问题，我选择了 Docker Desktop 的 M1 版本。然而就算如此，Arm 和 x86 的巨大区别还是在部署一些程序时出现了问题。我的一个项目 [mail-list-rss](https://github.com/George-Miao/mail-list-rss) 现在部署在 Fly.io 上。如果你不知道，Fly.io 支持的三种部署方式之一，也是使用最为广泛的部署方式之一，就是 Docker。然而他们家的打包机和运行时不出意外都是 x86 的，导致不论是我在本地打包 x86 的镜像抑或是在他们的打包机上打包都会有这样那样的问题（主要是 Rust 编译的问题）。以至于现在我只能在 VPS 上打包上传。

但是除此以外，如果不使用 crosscompile，一切都是很美好的。Web 开发，得益于这台电脑的强悍性能，一次开三四个浏览器，几十个 Tab 没有丝毫压力，就像之前说的，我在这台电脑上重写了整个博客。

## 各类软件

从 Linux 切换到 MBP 的一个明显的影响就是我现在更喜欢使用一些 GUI 软件了。曾经我可能只需要三个窗口，VSC，浏览器还有 Alacritty，现在，在 Mac 这个充满了优秀 GUI 软件的环境，我会选择使用一些桌面软件来替代曾经在网页或者命令行里使用的程序。上面说的 Docker Desktop 可能算是一个比较无奈的例子吧。

![2022-02-02T21:54:53Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/7495ad6c-9c47-4b68-df86-a61b7b5f6d00/public) _Utils 文件夹下面的程序们_

其中有几个我想要特别提一下。

### Raycast

[Site](https://www.raycast.com)

一个 SpotLight 的替代品，有很多第三方的插件，本身的界面也足够美观。其中的剪贴板历史是我最常用的功能之一。

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/aabeffc0-79dd-455b-7df6-f79b8b347a00/public)

看得出来插件作者很多都是开发者，有很多这方面的实用插件。我个人用的比较多的有：

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/c8bb93b5-74b1-483f-6683-22709d3b3f00/public)

除此以外还有 AWS, CircleCI, Console.dev, Docker, Docker Hub, Netlify, Elm package, Doppler... 选择非常多，就不一一列举了。

### Runcat

[Site](https://kyome.io/runcat/index.html?lang=en)

不确定算不算彻底的 GUI 软件，因为本身只是一个托盘上面的小程序，用猫或者别的什么动图的速度来表示系统占用，在点开的菜单里也有更详细的系统信息。很有意思的东西，有一系列可以自选的「Runner」，甚至可以用自己的图。

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/3da73ff6-96ad-400f-a011-b9c806896300/public)

### Itsycal

[Site](https://www.mowglii.com/itsycal/)

同样是托盘上的小程序。一个很漂亮的日历。

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/0d601578-966e-49d8-9426-61b1abd6a300/public)

### Dozer

[Github](https://github.com/Mortennn/Dozer/)

Bartender 的开源替代，用来隐藏托盘不想要的图标。Dozer 通过一个在托盘上可以随意拖动的点来分开你想要和不想要的图标，点的左边会被隐藏，右边则正常显示。最方便的是可以加上一个快捷键，我的设置是 `⌘ + ⌥ + B`，尽可能避免耗时的鼠标操作。

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/3c5cc908-a805-4c28-feff-56ffed380a00/public) _隐藏前_

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/d48aa650-0e05-4be9-d9c7-5bf3adf35c00/public) _隐藏后_

### Glyphfinder

[Site](https://www.glyphfinder.com) / [Gumroad](https://ueberdosis.gumroad.com/l/ZaEQz)

啊又是个托盘程序。。这次是一个用来搜索 Unicode Glyph 的程序。收费，但是挺好用的，可以用更符合直觉的类似 `->` 的组合来搜索字符。

![Screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/d702c3c6-94d3-4085-ede7-3d1019d2f900/public)

## 命令行

好了，足够的 GUI 之后自然要聊一聊命令行，或者更准确的来讲是命令行的配置。我现在 [Dotfile](https://github.com/George-Miao/Dotfile) 使用 yadm 管理。其中有一个非常好用的功能是根据不同的条件自动替换（准确来讲是软链接）配置文件。比如我有一个 `.zshrc` 和一个 `.zshrc##os.Darwin`，那么在 Mac 上 yadm 就会自动建立一个 `.zshrc ⇒ .zshrc##os.Darwin` 的软链接。依靠这个功能，再使用类似 includes 或者 eval 的命令，就可以做到多平台使用不同的配置文件。当然 yadm 还支持别的条件，具体请看 [文档](https://yadm.io/docs/alternates)。

## 其他

我买的 Mac 是 16 寸 的，但是这个大小对我来讲正好。我本人比较高，更习惯大屏幕的笔记本，多出来的一些重量也不算沉。可能是以前小学初中的时候训练出来了，每天背着它和 reMarkable2 上课完全感觉不到什么压力。两个月用来我基本上已经完全无视了额头，即便偶尔注意到也不会感觉太难受，可能这就是人的适应能力吧哈哈 😃。
