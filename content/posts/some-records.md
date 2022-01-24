---
title: '现在的一些配置'
created: 2021-02-24 02:32:01
categories: [ChitChat]
tags: [zh-Hans-CN, WIP]
---

这篇文章用来记录一些我目前使用的工具/配置/环境等等。

<!--more-->

## 电脑（们）

### NUC

我的主力机是一台咸鱼收来的 NUC8i7HVB，用了有半年了。装了~~人见人爱~~的 Archlinux，用来开发不要太爽。。除了在开发小程序或者用公司的企业微信比较无力以外。

++Some Img of NUC++

#### 参数

- 主板：NUC8i7HVB
- CPU：Intel i7-8809G
- GPU：Intel HD Graphics 630 / Radeon(TM) RX Vega M GH graphics
- Memory: 16G SO-DIMM x2
- Storage: HP SSD EX950 2TB

<!-- ![Screenshot](/home/pop/Pictures/2021_2_24_2_28.png) -->

### Mac Mini

这部机子是上周五（2021-02-27）刚拿到的，公司里闲置的老电脑。因为原本的 surface 性能不行而且是 windows 用着各种不顺手（字体，环境等等原因）所以直接讨了一台 Mac Mini 来玩。

#### 参数

- Mac mini (2018)
- CPU: 3.6 GHz 四核 Intel Core i3
- GPU: Intel UHD Graphics 630 1536 MB
- Memory: 16 GB 2667 MHz DDR4

性能一般，内存倒是还可以。还在各种适应快捷键还有配置环境，未来的主力开发机（在公司）

### 台式机

年前新装的台式机，我第一台 AMD 的机子，也是唯一一台 3A 的机子，主要用来打游戏，但是已经好久没打游戏感觉有点浪费啊（（

#### 参数

- AMD Ryzen 9 5950x
- Sapphire 6900xt
- ROG Strix X570-E Gaming
- 32g x4

## 杂七杂八

- `Shell` - zsh。之前用 [powerlevel10k](https://github.com/romkatv/powerlevel10k)，后来觉得太花里胡哨了也有点审美疲劳，现在 Mac 上用的 [Pure](https://github.com/sindresorhus/pure)。
- `Terminal` - Yakuake & iTerm2
- `Editor` - VSCode-Insiders，配置了不少东西，用自带的 `settings-sync`，还蛮不错的，插件、设置、快捷键都会同步好。
- `Vim`
- `Telegram` - 各个平台基本都用的 Telegram 官方客户端（Telegram-QT 之类的），除了 windows 用的 unigram。实在是 windows 的字体渲染太难受了，WPF 没那么多的历史包袱，整体的效果会比 win32 的程序好看很多。曾经手机上用的 TelegramX，可是作者真的太久没更新了，很多新出的 feature 都用不了，只能转回 Telegram 官方客户端（或许以后会试试 Plus Messenger 之类的）
- `Yarn`
- `N` - Node 版本管理
- `Rclone` - 用来同步和备份移动硬盘到 B2 上。BTW，B2 + Cloudflare 免费带宽真的用的好爽（
- `Browser` - Chromium 和 Firefox Developer。三月中谷歌要停 Chromium-based 浏览器的同步，~~我还不清楚会干脆转到 FF 还是去用 Chrome~~ 我已经全面转到 FF Dev 了。~~谷歌怎么还不倒闭~~
- `AUR` - yay
- `Cloudflare` - 我的大部分域名都 host 在 cf，主要用的功能大概是 `workers`, `dns` 和 `cdn`，偶尔会用一下 `Page Rules`。至于`Anti-DDoS`，我个人的站基本没什么流量 ~~我也想有人来 D 呜呜呜~~ 所以不在意。
- `Cf Page` - Cloudflare 最新开放 beta 的功能，基本就是类似 Vercel 和 Netlify 那样的静态站部署。因为是还在 beta 的原因，使用体验不是很好，build 一个基础的小单页应用需要五分钟，大部分时间在 setup。经常有莫名其妙的 Internal Error 直接弹出来。而且从功能性上来讲，比起其他我用过的类似服务都要简陋的多。我本来期待着作为 cf 生态的新成员可以和 cf 的其他功能完美联动，结果除了一个自动设置 CNAME 到 pages.dev 的子域名以外就没有其他联系了。包括我本来期待的类似 Vercel functions 那样可以作 per-repo 的 worker 也根本看不见影子。希望未来 cf 能好好完善一下吧。
- `Vercel` - 以前用 [Netlify](https://netlify.com)，后面就转到 Vercel 了。据我个人不可靠的测试，Netlify 似乎比 Vercel 要慢不少。基本就是部署一些 JAMStack 的站，或者类似这个博客这样的纯静态站。好用，懒人必备，push 即更新（
- `Pokect` - 用来存放一些看到的感兴趣的网站/工具之类的。
- `Inoreader` - RSS 聚合阅读器。怎么说呢，有点腻算法推荐的东西了。每天几篇 RSS 更新看完为止的感觉蛮好的（~~其实是小说书荒了~~
- `Namecheap` - 域名注册
- `Clash` - 科学上网客户端。支持的协议蛮多的，可惜配置文件用的 yaml，而且有不少槽点，比如奇奇怪怪的 Premium 版（闭源，只有编译好的版本提供）。
