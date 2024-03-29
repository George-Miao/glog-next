<!-- markdownlint-disable -->

# Design tweak - 2022-5-25

![2022-05-24T17:52:50Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/f4060d5a-f42c-4b76-8676-0d6695e7a000/public)

- New tips and warn container style

- Fix when `<code>` and `<a>` are nested, underline and hover is broken

# Update projects panel - 2022-05-23

- Old:

![2022-05-23T14:48:26Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/33409aed-54ac-4ae3-756b-af8bca7b0700/public)

- New:

![2022-05-23T14:46:54Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/f3c523ce-9226-4186-2e0e-431dd1409d00/public)

Minor design tweaking

# New upptime endpoints - 2022-05-23

![2022-05-23T13:28:50Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/6d30ad53-c998-42db-6566-fe8e63b1cc00/public)

Four new endpoints have been added to the [Upptime](https://status.miao.dev):

- [Golden Axe](https://github.com/suisei-cn/golden-axe-rs)
- [Mail list to rss](https://github.com/George-Miao/mail-list-rss)
- [Stargazer reborn doc](https://doc.stargazer.sh/core/)
- [Stargazer reborn book](https://book.stargazer.sh)

# Keys added - 2022-05-16

![2022-05-23T13:22:44Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/89d64049-7512-49cf-0a1e-22a3549e2700/public)

GPG pubkey and ssh pubkey are now available under [feeds](/feeds).

# Error page - 2022-01-29 14:06:59

![2022-01-29T19:14:28Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/33e36183-71f4-442e-80bd-d1b6823f7600/public)

Error pages ([404](/404) and [500](/500)) are now available.

# Rewrite in Next.js - 2022-01-28 17:16:19

![2022-01-29T00:32:07Z.png](https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/dbbe3391-3ae8-43d1-9751-5491a3801100/public) _Brand new design_

Glog is fully rewritten in Next.js. Two previously separated sites [Proj.](https://github.com/George-Miao/Proj) and [Index](https://github.com/George-Miao/index-page) are now merged into one site under domain [miao.dev](https://miao.dev).

## What's new

- Ditched Hexo, now fully rewritten with Next.js, including rendering posts with [markdown-it](https://github.com/markdown-it/markdown-it)
- Changelog
- New UI with same color scheme and design pattern
- Fine-tuned responsiveness brought by WindiCSS

## Todo

- CORS Proxy for connectivity testing in [Projects](/projects) panel
