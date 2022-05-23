---
title: 年轻人的第一个XP展板
categories: [Tutorial]
tags: [zh-Hans-CN, NSFW]
created: 2021-06-21 19:02:56
---

~~哪个男孩子没有搭建一个 XP 展板的梦想呢？~~ 于是在某群友的启发下 [EhFavorite](https://github.com/George-Miao/EhFavorite) 诞生了，目前部署在 [eh.pops.moe](https://eh.pops.moe)。

::: danger **NSFW Warning**

**警告：请勿在工作/上课时打开** :::

<!-- more -->

## 提前准备

::: success 本文章默认你有一部分的开发和运维基础知识 :::

本项目分为两个部分：前端 `/front` 和后端 `/worker`。前端部分是基于 [Svelte](https://svelte.dev/) 的标准 `Jamstack`，任何支持的平台或者 http server 都可以用来 host。我的现在部署在 [Vercel](https://vercel.com) 并通过某不愿透露姓名的知名 CDN [Cloudflare](https://cloudflare.com) 来~~减速~~加速，因为一些众所周知的原因，可能不太适合用来给国内访问。后端部分你可以用我已经部署好的 api（`https://api.miao.dev/eh?cookie={cookie}`），但是直接使用已经部署好的 api 可能会导致性能问题，而且我不会帮你[定时更新缓存](#cron)，缓存可能会过时。后端部分被部署在 [Cloudflare Workers](https://workers.dev) 上。部署本项目需要：

1. 可以用来部署网站的服务器 或 支持 Jamstack 的平台（[CF Pages](https://pages.dev)，[Vercel](https://vercel.com)，[Netlify](https://netlify.com) 等）
2. 一个可以用来编辑一些内容的本地环境（毕竟你我大概都不想在自己/别人的页面上看到 Pop's Fav），包括 Node, npm/yarn 等。
3. 一个 E-hentai 帐号

如果你打算也部署一个自己的后端，你还需要：

1. Cloudflare 账户（有免费 tier）
2. [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler)

将本项目 `Clone` 至你自己的帐号下。

在满足了这部分条件之后就可以正式开始啦！~~I say.. Hey, hey, hey, start...~~

## 获取 Cookie

E-hentai 通过 cookie 来判断用户信息。形如： `ipb_member_id=ddddddd; ipb_pass_hash=xxxxxxxxxxx;` 在浏览器上登陆一下 eh 然后通过 developer tool 的 Storage tag 就可以获取到 cookie 了。

## 开始修改！

修改以下内容 ~~我就是直接 hardcode 了你来打我呀~~：

```html
<!-- /front/src/components/Level.svelte @ 12 -->
<p class="level-item has-text-centered has-text-weight-semibold xp">
  Pop's Fav
</p>

<!-- /front/src/components/Level.svelte @ 17 -->
<a class="title" href="https://github.com/GeorgeMiao219/EhFavorite">Link</a>

<!-- /front/src/components/Layout.svelte @ 18 -->
<p>
  <strong>EhFav</strong>
  built with ❤ by
  <a href="https://miao.dev">Pop</a>
  . Powered by
  <a href="https://svelte.dev">Svelte</a>
  and
  <a href="https://bulma.io/">Bulma</a>
  .
  <br />
  The source code is licensed
  <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
  .
</p>

<!-- /front/public/index.html @ 7-->
<link
  href="https://fonts.font.im/css?family=Roboto+Condensed"
  rel="stylesheet"
/>
<title>Pop's Fav</title>
```

更换为你的 api 或者在 url 后面放 `?cookie=$COOKIE_VALUE`：

```javascript
// /front/src/App.svelte
const loadGalleries = async () => {
  // 修改这行为你的 URL 或者 https://api.miao.dev/eh?cookie=$COOKIE_VALUE
  // 要不然你就会发现我的 xp 变成了你的 xp
  return await fetch('https://api.miao.dev/eh')
    .then((e) => {
      if (!e.ok) {
        throw new Error()
      } else return e
    })
    .then((e) => e.json())
    .then((e) => e.map(APItoGallery) as Gallery[])
    .catch(() => alert('Unable to load data from API, try later'))
  }
```

修改完成后检查一下有没有问题

```bash
$ yarn run dev
# or
$ npm run dev
```

## 部署

### 前端部分

Jamstack 部署可以参考 [这篇博客](https://blog.codecentric.de/en/2019/02/modern-jamstack-deployment/)，编译输出的文件目录是 `/front/dist`，如果部署到平台后显示白屏请手动设置。

### 后端部分（可选）

首先创建一个 `wrangler.toml`:

```bash
> cd worker
> wrangler init
```

然后往里面添加你的帐号信息，其中 `account_id` 和 `zone_id` 都可以在 [Cloudflare Dashboard](https://dash.cloudflare.com) 首页找到（详情参看[官方文档](https://developers.cloudflare.com/workers/cli-wrangler/configuration)）：

```toml
account_id = ""
route = "" # 如果你打算用 workers.dev 的话此处可以留空
zone_id = ""
```

首先使用 `wrangler` 创建一个叫做 `eh` 的 `namespace`

```bash
$ wrangler kv:namespace create eh
```

然后把自己的 cookie 存进 kv ~~其实应该放 secrets 里的，我就放 kv 了，你打我啊~~，把 `$COOKIE_VALUE` 替换为你刚才获取到的 cookie：

```bash
$ wrangler kv:key put cookies $COOKIE_VALUE --binding eh
```

然后部署到 `Cloudflare`：

```
$ wrangler publish
```

在 `wrangler.toml` 里添加你的 `Cron trigger` 来定时更新缓存：{#cron}

```toml
# wrangler.toml
[triggers]
crons = ["0 0 * JAN-JUN FRI", "0 0 LW JUL-DEC *"]
```

::: warning {#warn} 注意：不要把 cron 设置的太过频繁，否则会导致 e-hentai ban ip。由于 Cloudflare Workers 的向外 fetch 的 IP 都是同一个，会导致所有访问 e-hentai 的 Workers 全部失效。 :::

## FAQ & 问题

- Q: 为什么加载这么久？ A: 别问，问就是 known issue and won't fix
- Q: 为什么部署到 `vercel` （或者别的 Jamstack 平台）上之后显示白屏？ A: 去设置，找到 Output directory，改为 `dist`
