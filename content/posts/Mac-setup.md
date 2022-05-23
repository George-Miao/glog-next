---
title: Mac setup
categories: [ChitChat]
tags: [zh-Hans-CN, WIP]
created: 2021-12-04 05:18:09
---

10.20 下的单，12.1 才到，苹果你可真是让我好等啊。言归正传，Macbook Pro 2021 发布的当天我就下了单，这篇博客简单讲一下这两天我都做了些啥。

<!-- more -->

![Screenshot of order confirmation](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/67ef33da-d815-40c6-10a7-0a7916db9300/public) _钱包在哭泣_

## 包管理 - Nix

我觉得一个系统最重要的易用性指标之一就是他安装一个软件所需要的时间，在程序员视角各种包管理无疑是最方便的。用惯了 Linux (Arch / Pacman)，在 MacOS 上当然也要用上包管理。大部分人可能会用 brew，因为生态好（打问号），简单上手。不过我还是选择使用了 [Nix](http://nixos.wiki)，并配合两个社区工具 [Nix Darwin](https://github.com/LnL7/nix-darwin/) + [Home Manager](https://github.com/nix-community/home-manager)，目前工作良好，实在是声明 + 函数式的包管理蛮吸引我的。

具体来讲就是 Nix Darwin 用来管理一些全局的、或是需要 root 权限的程序，Home Manager 则用来管理 per-user 的包，当然我估计这电脑上也不会有第二个用户了（XD。不过 Nix 的缺点也很明显，因为不是专门为 MacOS 打造的包管理，在 GUI 程序方面有很大欠缺（生态和功能），不如 brew cask。

## 体验

拿到手第一时间就配置上了 rust 环境，并且把我之前在家里台式机写到一半的 [Mail list rss](https://github.com/George-Miao/mail-list-rss) clone 到本地继续写，很让人惊喜。中间几乎没有任何阻碍，x86 和 Arm 之间的差别也没有怎么体现出来，没有 windows 和 linux 之前的一堆不兼容和问题。个人感觉每次「更新 - 编译 - 测试 - 再更新」的循环和台式机差不太多，至少不会有明显的迟缓和卡顿，相比较之下，之前隔离的时候用我那台老的 AMD 版本的 Surface Laptop 3 写的 [Pop.tg](https://pop.tg)，wsl 空载能占用 30% 的内存和 CPU， 写个前端卡的要死，当时就下定决心要换电脑（后来我直接用 dd 把 windows 冲掉了）。

### 续航

不得不提起这一代 MBP 的一点就是它的续航。我的版本是 16" 的，100 瓦的电池，号称 14 小时无线上网。到手的体验也很明显，完全没有电量焦躁 _（咳咳， 某 i 打头的手机）_。这张截图是我晚上正常使用的耗电，基本搭配是 Docker + Mongodb + VSCode + Safari 一起开着，可能再听个歌啥的。7 个小时不间断使用，还剩 30% 左右的电量。

![Battery screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/fbfe8e19-e8c3-4c3d-802c-ff0e58aba000/public) _晚上八点到凌晨三点，100% - 30%_

### UI/UX

苹果的界面还是一如即往的惊艳，用惯了自己配置自己调颜色调主题的 [拖拉机式开源界面](https://github.com/George-Miao/Dotfile)，跑来用大公司开发的 proprietary 体验就是不一样。顺滑，统一，不会出现八代同堂的盛况（大概不会吧）。交互方面也是无可挑剔，顶尖的触控板配合上三指拖动，最后再调整一下快捷键（Mac 自己的 Modifier 属实用不惯）即可。

![Modifier configs](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/9c4be5e6-f91e-4cb8-9f70-436b40360800/public) _经典的 Caps Lock 永远不是 Caps Lock_

![Desktop screenshot](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/4ab289b1-f264-46a5-e056-ef97f6c8d100/public) _软件为 Reeder 5, 收费但非常好用，设计和交互也是浓郁果味_

### 刘海

新一代 MBP 绕不过去的话题就数刘海了。我之前跟人聊天时候说，其实这个刘海最恶心的地方不在于你在桌面上看他的时候。这个时候他就只是静静地在那里呆着恶心你，却不会真正干扰你的工作，直到——你开始使用全屏。众所周知，Mac 在全屏模式下会自动把顶栏隐藏起来，做一整块的黑边让人以为没有刘海，但是每当你使用 safari 想要把指针移动到地址栏的时候，但凡一不小心多移了一点——恭喜，你指针不见了！我不太清楚苹果这个神秘的设计是哪里来的，还是根本没有思考过这个问题，刘海能藏鼠标我确实没想到。

::: success 未完待续 :::
