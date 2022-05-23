---
title: First Post
created: 2021-02-22 02:47:53
updated: 2021-02-22 13:46:24
categories: [ChitChat]
tags: [en-US, WIP]
---

This is my first actual post here. Those four before are either test posts or placeholders (which means part or all of the content are random generated) I created during developing and testing so it is not your problem if you cannot understand some of the content. I would like to share how I created this site and other chit-chats about it and the future.

<!-- more -->

## Features and TODO

There's several things I want to do or implement on this blog site, but have no time or simply not finished yet. So I will make a list for that. This list also includes what I have already done. I will be updating this list if any TODO is eliminated or any feature is added to TODO list.

- [x] The site itself
- [x] Potology, the theme of this site based on [Acetology](https://github.com/iGuan7u/Acetolog) which is ported from [Typology](https://mekshq.com/theme/typology/1)
- [x] Deployed on [Vercel](https://vercel.com)
- [x] [blog.miao.dev](https://blog.miao.dev) for [master branch](https://github.com/George-Miao/GlogHexo)
- [x] [blog-preview.miao.dev](https://blog-preview.miao.dev) for [dev branch](https://github.com/George-Miao/GlogHexo/tree/dev) preview
- [x] A customized 404 page
- [x] [Archive](/archives), tags and categories page
- [x] RSS
- [x] Style for customized containers
- [x] CI/CD pipeline for remote writing
- [ ] favicon (Yea I'm too lazy to make a favicon)
- [ ] Rewrite Potology with modern template engine (like ejs or pug, TBD) and maybe Sass/Scss/Less (This is just my personal preference).
- [ ] Separated sitemap page

## Sitemap

- [Root](/) - `/`
- [About](/about) - `/about`
- [Archives](/archives) - `/archives`
- [404](/404) - `/404`
- Posts - `/:postTitle`
- Category - `/categories/:categoryName`
- Tags - `/tags/:tagName`

## About my blog and the _History_

<!-- ++There should be something here in future++ -->

I have built two blogs for myself before. The first one was two years ago. I wasn't that familiar with Javascript at that time and was just a beginner with Python. The entire thing was written by myself, for the sake of practicing.

### First site

> _" The homemade blog server and so-called content manage system "_ -- Myself

#### Backend

Server using [Flask](https://flask.palletsprojects.com) that runs on my VPS by [Vultr](https://vultr.com)

#### Frontend

Static html/css generated with Jinja2 template engine bundled with Flask. Jinja2 is quite like swig which I'm using right now. Actually, in swig's introduction, it says:

> Swig is an awesome, Django/Jinja-like template engine for node.js.

<!-- TODO change blockquote style to italic -->

And we can't deny that swig is an awesome template engine indeed. However, with the lack of maintenance[^1], it will be better to switch to a more actively maintained and improved template engine. Ejs and pug are good choices. So, why would I use swig at the first place? Well, since Potology is based on Acetolog and Acetolog uses swig ...

[^1]: [Last commit](https://github.com/paularmstrong/swig/commit/70a1c8899266893ff22354c2426329e306c2f322) of swig official repo was on Aug 6, 2016

[More information about Flask templating ->](http://docs.jinkan.org/docs/flask/templating.html)

[More information about Swig ->](https://github.com/paularmstrong/swig)

#### Content

All blog posts are written in Markdown, and stored on Dropbox. I use Dropbox linux version to synchronize files to the server. The web server will handle caching, file update, And Markdown rendering. This also enables me to write articles on any editor supports dropbox integration. However, with my "home made" CMS, it is very hard to add extra functionalities to my page and content. For example, to insert a video player or customized block, I need to write my own rule for markdown engine, then rewrite my css and/or html to support that. And that is why I switched to hexo, which has a great ecosystem which provides a wide range of plugins makes life easy and simple.

### Second blog

The second one is a hexo instance runs on my VPS, use SSH to deploy everything to Github Page. There's nothing much worth talking about.

### Third blog (This one)

The first motivation of building a new blog site was when I saw [Ridiqulous.com](https://ridiqulous.com), which I believe is built using Wordpress and typology theme (If not, someone please tell me). The usage of Josefin Sans and the nice red-white color contrast makes the overall feeling so clean and gorgeous.

The site is deployed on Vercel, and cached with Cloudflare. Although according to Vercel, it is not recommended to use Vercel behind Cloudflare proxy because _**"it will introduce a minor performance penalty to your website due to the additional hop"**_[^2], I still find using Cloudflare to proxy and cache my content via its global CDN network will be helpful for speeding my site up. Also, Cloudflare provides lots of additional tools for your site like [anti-DDoS](https://www.cloudflare.com/ddos/) and [Workers](https://workers.dev), which lots of articles already introduced. All you need is to have a domain and resolve it to Cloudflare's NS.

[^2]: [How do I use a Cloudflare domain with Vercel?](https://vercel.com/support/articles/using-cloudflare-with-vercel#with-proxy)

#### Frontend

Potology theme with stylus style sheet, transpile and built by hexo. I may rewrite this part with Sass/Scss/Less in future.

#### Backend

Static file deployed on Vercel behind Cloudflare CDN - No server this time.

#### Content

I have to admit, content managing with hexo is not as convenience (at least without other plugins or modifications) as the first Dropbox-based one built by myself. With Dropbox, I can write and sync my article anywhere, easily deploy to live. The logic is simple:

- If not cached: `Request =(Flask)=> Server =(Read file)=> MD posts =(Mistune)=> HTML =(Flask)=> Response`
- If cached: `Request =(Flask)=> Server => Cached HTML =(Flask)=> Response`

With hexo, the logic will be:

- Building: `Push =(Git)=> Build =(Vercel)=> Live`
- Serving `Request =(Cloudflare)=> Vercel => Resource =(Cloudflare)=> Response`

So in order to get the same convenience, I need a CI/CD pipeline to do the push & build step.

Besides all that, I have done a lot to optimize the overall experience with this site, with tons of fine-tuning styles and loading-time optimization. I may write a separated article on how I optimize my site.
