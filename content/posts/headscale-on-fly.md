---
title: 在 Fly.io 上用 nix 和 docker 部署 Headscale
categories:
  - Article
tags:
  - zh-Hans-CN
  - nix
  - fly.io
created: 2024-09-06 23:29:00
---

Tailscale 很好用：一个不用自己手动管理 peer 和密钥的 wireguard 网络谁不爱呢？并且 tailscale 大部分组件都是开源的，对于大多数人来讲都是足够且好用的选择了。但是谁让我爱折腾呢？所以我找到了一个开源的 tailscale 控制服务器替代：Headscale，并且和 headscale-admin 一起打包部署到了 fly.io 上。

<!--more-->

## Intro

其实我在两年前刚接触到 [tailscale](https://tailscale.com) 的时候就听说过 [headscale](https://headscale.net) 了。但是那个时候 headscale 还是一个很早期的项目，并且我也没那个时间去折腾，索性继续用 tailscale 的服务了。这次主要是之前看了 [这篇](https://xeiaso.net/talks/2024/nix-docker-build/) 推荐用 nix 构建 docker 镜像的文章想要尝试一下，并且正好前两天把所有机器都迁移到了用 nix 管理[^1]（包括 tailscale 相关的配置），所以就顺便把 headscale 部署到了 fly.io 上。

这次主要会用到 [nix](https://nixos.org), [docker](https://www.docker.com), 以及其他一些零零散散的相关工具。如果你对 nix 不是很熟悉，简单来讲 nix 是一个函数式的包管理工具，可以用来构建软件包，管理系统配置等等，其中我们会主要用到 [nixpkgs](https://nixos.org/manual/nixpkgs/stable/#preface) 的 [`dockerTools`](https://ryantm.github.io/nixpkgs/builders/images/dockertools/) 来构建 docker 镜像。和普通 `Dockerfile` 相比，nix 构建的镜像的优势是在于它会给每一个用到的 nix “软件包” 都创建一层 layer，可以更好的利用 docker 的缓存机制，并减少镜像大小 [^2]。

::: warn
Headscale 官方不鼓励使用容器部署[^3]，但是有打包提供 [镜像](https://github.com/juanfont/headscale/pkgs/container/headscale)。
:::

[^1]: <https://github.com/George-Miao/nix-config>
[^2]: <https://fasterthanli.me/series/building-a-rust-service-with-nix/part-11#streaming-docker-images>
[^3]: <https://github.com/juanfont/headscale?tab=readme-ov-file#running-headscale>

## Setup

首先我们新建一个 nix flake 项目，如果你对 flake 不是很了解，推荐看 [这篇文章](https://xeiaso.net/blog/nix-flakes-1-2022-02-21/)。在项目目录的根目录下新建 `flake.nix`，内容如下：

```nix [flake.nix]
{
  description = "Headscale on Fly.io";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
    in {
      packages = [];
    });
}
```

这里添加了 [`flake-utils`](https://github.com/numtide/flake-utils) 作为依赖用来更方便地写 flake。目前 packages 还是一个空数组，后面我们会在这里声明要构建的 docker 镜像。接下来初始化 fly 配置：

```bash
$ flyctl launch
Scanning source code
...
```

跟着提示填入你想要的 app id、可用区等信息，在项目下生成 `fly.toml`。接下来我们需要给项目创建一个持久化硬盘来存放 Headscale 的数据，这里我们用到了 fly.io 的 [volumes](https://fly.io/docs/volumes/overview/)：

```bash
flyctl volumes create persistent
```

并配置好挂载：

```toml [fly.toml] {4-6}
app            = 'headscale-on-fly-example'
primary_region = 'ewr'

[mounts]
source      = "persistent"
destination = "/var/lib/headscale"

[[vm]]
memory   = '1gb'
cpu_kind = 'shared'
cpus     = 1

```

## 配置 Headscale

我使用的是 Headscale 最新的 [v0.23.0-beta3](https://github.com/juanfont/headscale/releases/tag/v0.23.0-beta3) 版本。相较 v0.22，v0.23 修复了一些 docker 部署时的 bug，但是因为是 beta 版本，可能会有稳定性问题。

首先从官方仓库里下载一份配置文件样例：

```bash
# 你也可以用 wget 或者其他的下载工具
$ curl https://raw.githubusercontent.com/juanfont/headscale/main/config-example.yaml -o ./config.yaml
```

把服务器 url 替换成部署到 fly.io 后的地址，后续也可以换成你的域名：

```yaml [config.yaml]
# ...
server_url: https://${YOUR_APP}.fly.dev:8080
```

其中 `YOUR_APP` 请替换成你之前初始化 fly app 时输入的名称。后续为了方便我会使用 `headscale-on-fly-example` 作为 app 名。

因为我们要打包进容器，把 http 和 gRPC 的地址替换成 `0.0.0.0`:

```yaml [config.yaml]
# ...
listen_addr: 0.0.0.0:8080
# ...
grpc_listen_addr: 0.0.0.0:50443
```

你可以根据自己的需求修改其他配置，详见配置文件内的注释及 [官方文档](https://headscale.net)。

## 构建 Docker 镜像

nixpkgs 目前的 headscale 版本还是 v0.22。为了使用最新的 headscale，这里选择手动下载 release 里的可执行文件。如果后续 nixpkgs 更新了 headscale 版本，可以直接用 nixpkgs 里的版本。

```nix [flake.nix]
# ...
packages = rec {
  headscale = pkgs.stdenv.mkDerivation {
    name = "headscale";
    src = pkgs.fetchurl {
      url = "https://github.com/juanfont/headscale/releases/download/v0.23.0-beta3/headscale_0.23.0-beta3_linux_amd64";
      hash = "sha256-8V04okyt8rpwssNrtDJAhMHn3BiGTlRavfbctqC5QeE=";
    };
    unpackPhase = ":";
    installPhase = "mkdir -p $out/bin && cp $src $out/bin/headscale && chmod +x $out/bin/headscale";
  };
};
# ...
```

::: tip
`fetchurl` 的 `hash` 可以用 `nix-prefetch-url` 来生成。
:::

接下来拉取 [headscale-admin](https://github.com/GoodiesHQ/headscale-admin) 的 docker 镜像。首先获取镜像的 digest：

```bash
$ nix run 'nixpkgs#nix-prefetch-docker' goodieshq/headscale-admin -- --image-tag 0.1.12b
Getting image source signatures
Copying blob 619be1103602 done   |
Copying blob a167b92bd92c done   |
Copying blob aaa65d292341 done   |
Copying blob 832dc3f423ae done   |
Copying blob 919aaea42109 done   |
Copying blob 3f77b833d137 done   |
Copying blob c1394ac7575f done   |
Copying config bf11c46f0b done   |
Writing manifest to image destination
-> ImageName: goodieshq/headscale-admin
-> ImageDigest: sha256:21b419eeb48caf4eb17d362a49204d50aac57cc5984a36803d0791d74ef0232c
-> FinalImageName: goodieshq/headscale-admin
-> FinalImageTag: 0.1.12b
-> ImagePath: /nix/store/pcg1hibjasqmaxgacv8cmxikbvfyl6zn-docker-image-goodieshq-headscale-admin-0.1.12b.tar
-> ImageHash: 0lbb3ydb6w9rj5n9b2db41x0yapxp373d1bb5xybbrf2qz00zak7
{
  imageName = "goodieshq/headscale-admin";
  imageDigest = "sha256:21b419eeb48caf4eb17d362a49204d50aac57cc5984a36803d0791d74ef0232c";
  sha256 = "0lbb3ydb6w9rj5n9b2db41x0yapxp373d1bb5xybbrf2qz00zak7";
  finalImageName = "goodieshq/headscale-admin";
  finalImageTag = "0.1.12b";
}
```

::: notice
`nix run` 是一个 [实验性的 nix 特性](https://nix.dev/manual/nix/2.18/contributing/experimental-features)，如果你没有启用可以跟着报错来启用。
:::

并把生成的 nix 表达式添加到 `flake.nix`:

```nix [flake.nix]
# ...
packages = rec {
  headscale = /* ... */;
  headscale-admin = pkgs.dockerTools.pullImage {
    imageName = "goodieshq/headscale-admin";
    imageDigest = "sha256:21b419eeb48caf4eb17d362a49204d50aac57cc5984a36803d0791d74ef0232c";
    sha256 = "0lbb3ydb6w9rj5n9b2db41x0yapxp373d1bb5xybbrf2qz00zak7";
    finalImageName = "goodieshq/headscale-admin";
    finalImageTag = "0.1.12b";
  };
};
# ...
```

因为我们要把 headscale-admin 和 headscale 放在同一个域名下面，我们需要一个反向代理。这里我们用 [caddy](https://caddyserver.com)。Caddyfile 配置如下：

```nix [Caddyfile]
{
  auto_https off # Fly.io 会在边缘网络上终止 tls
}

:80 {
  redir / /admin/

  handle /admin* {
   root * /app
   file_server
  }

  handle {
   reverse_proxy localhost:8080
  }
}
```

因为我们现在有两个程序需要启动（caddy 和 headscale），简单写一个启动脚本:

```bash [start.sh]
#!/bin/sh
caddy start --config /etc/caddy/Caddyfile
/bin/headscale serve
```

现在终于可以来构建 docker 镜像了：

```nix [flake.nix]
# ...
packages = rec {
  headscale = /* ... */;
  headscale-admin = /* ... */;
  image = let
    copy = from: to: pkgs.writeTextDir to (builtins.readFile from);
  in
    pkgs.dockerTools.buildLayeredImage {
      name = "headscale-on-fly-example";
      created = "now";
      tag = "latest";

      fromImage = headscale-admin;
      contents = [
        (pkgs.buildEnv {
          name = "headscale";
          pathsToLink = ["/bin"];
          paths = [headscale];
        })
        (pkgs.buildEnv {
          name = "config";
          pathsToLink = ["/etc"];
          paths = [
            (copy ./config.yaml "/etc/headscale/config.yaml")
            (copy ./Caddyfile "/etc/caddy/Caddyfile")
          ];
        })
        (pkgs.buildEnv {
          name = "start";
          pathsToLink = ["/bin"];
          paths = [(copy ./start.sh "/bin/start.sh")];
        })
      ];

      config = {
        Cmd = ["${pkgs.bash}/bin/bash" "/bin/start.sh"];
      };
    };
  default = image;
};
# ...
```

如果一切正常，可以用 `nix build` 来构建镜像：

```bash
$ nix build
$ file `readlink -f result`
/nix/store/dbwb8k8jzlvk7dzcw25v7j4jkad9yv30-headscale-.tar.gz: gzip compressed data, from Unix, original size modulo 2^32 138250240 gzip compressed data, reserved method, ASCII, has CRC, from FAT filesystem (MS-DOS, OS/2, NT), original size modulo 2^32 138250240
```

现在目录下多了一个 `result`，是我们构建的 docker 镜像（`tar.gz` 格式）。

## 部署到 Fly.io

首先我们需要把镜像上传到 fly.io 的容器仓库：

```bash
# 加载镜像到本地的 docker
$ cat result | docker load
Loaded image: headscale-on-fly-example:latest

# 给镜像打上带 fly.io 仓库的 tag
$ docker tag headscale-miao-dev:latest registry.fly.io/headscale-on-fly-example:latest

# 推送到 fly.io 的仓库
$ docker push registry.fly.io/headscale-on-fly-example:latest
```

然后修改 `fly.toml`，添加上服务和镜像：

```toml [fly.toml]
# ...

build.image = "registry.fly.io/headscale-on-fly-example:latest"

# Web UI
[[services]]
ports         = [{ handlers = ["http"], port = 80, force_http = true }, { handlers = ["tls"], port = 443 }]
concurrency   = { hard_limit = 25, soft_limit = 20 }
internal_port = 80

# API
[[services]]
ports         = [{ handlers = ["tls"], port = 8080 }]
concurrency   = { hard_limit = 25, soft_limit = 20 }
internal_port = 8080

# gRPC
[[services]]
ports         = [{ handlers = ["tls"], port = 50443 }]
tls_options   = { "alpn" = ["h2"] }
concurrency   = { hard_limit = 25, soft_limit = 20 }
internal_port = 50443

[checks.metrics]
grace_period = "30s"
interval     = "30s"
method       = "get"
path         = "/metrics"
port         = 9090
timeout      = "10s"
type         = "http"

[checks.caddy]
grace_period = "30s"
interval     = "30s"
method       = "get"
path         = "/admin/"
port         = 80
timeout      = "10s"
type         = "http"
```

最后部署到 fly.io：

```bash
$ flyctl deploy
==> Verifying app config
Validating /example/headscale-on-fly/fly.toml
✓ Configuration is valid
--> Verified app config
==> Building image
Searching for image 'registry.fly.io/headscale-on-fly-example:latest' remotely...
image found: [:REDACTED:]

Watch your deployment at https://fly.io/apps/headscale-on-fly-example/monitoring
# ...
```

如果部署成功，你可以访问你的 fly app 的地址来查看 headscale 的 web 界面了。

## 后续

你还需要一个 headscale 用户和 token 来登陆 headscale 的 web 界面，需要用到 headscale cli。flyctl 可以直接在 fly app 里执行命令:

```bash
$ USER="YOUR USER NAME"
$ flyctl ssh console -C "headscale users create ${USER}"
User created
$ flyctl ssh console -C "headscale preauthkeys create --user ${USER}"
9995cff100283c0ec102c3b3f2408f90dd4755e7d8000000
```

在 `https://${YOUR_APP}.fly.dev/admin/` 用你的用户名和 token 登陆即可。

## 总结

这次主要是用 nix 和 docker 部署了 headscale 到 fly.io 上。nix 的优势在于可以更好地利用 docker 的缓存机制，减少镜像大小。fly.io 的优势在于可以很方便地部署到全球各地的边缘节点，同时还提供了很多方便的功能，比如持久化硬盘、容器仓库等等。这次部署的 headscale 是一个 beta 版本，可能会有稳定性问题，如果你对可靠性有要求，可以选择 tailscale 或者等 headscale 的稳定版本。
