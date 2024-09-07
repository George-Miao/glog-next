---
title: Use fly.io to deploy your rust app
categories: [Article]
tags: [en-US, Rust, fly.io]
created: 2022-05-24 17:12:29
---

[Fly.io](https://fly.io) is an Saas platform that let users to deploy their apps via docker image or buildpacks. It's perfectly suitable for small and medium-sized apps for the generous free tier and easy-to-use cli. In this article, I will show how to deploy a rust app with fly.io.

<!-- more -->

## First, we need a rust app

We will start with a simple http server that runs on `http://0.0.0.0:8080/` and respond with `200 Hello, world!` and `204 NO CONTENT` upon receiving a `GET /` and `GET /health` request, respectively.

First run `cargo new` to create a new project:

```
├── Cargo.toml
└── src
    └── main.rs
```

Then add some dependencies:

```toml
# Cargo.toml

[package]
name    = "rust-demo-server"
version = "0.1.0"
edition = "2021"

[dependencies]
axum  = "0.5.6"
tokio = { version = "1.18.2", features = ["macros", "rt-multi-thread"] }

# Defining bin here to make multi stage docker build work
[[bin]]
name = "rust-demo-server"
path = "src/main.rs"
```

And the code:

```rust
// main.rs

use axum::{http::StatusCode, routing::get, Router};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(|| async { "Hello, world!" }))
        .route("/health", get(|| async { StatusCode::NO_CONTENT }));

    axum::Server::bind(&"0.0.0.0:8080".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
```

Now run it locally with `cargo run` and test with [`xh`](https://github.com/ducaale/xh):

```bash
➜ xh :8080
HTTP/1.1 200 OK
Content-Length: 13
Content-Type: text/plain; charset=utf-8
Date: Tue, 24 May 2022 10:28:04 GMT

Hello, world!
```

::: tip
`xh` is a cli tool written in Rust to do http requests. If you ever used `httpie` before, it will be familiar to you. I choose `xh` because `httpie` is written in Python which is much, much slower.
:::

Voilà! Now we have a simple http server, with Rust!

## Start our journey with fly.io

It's time to introduce `flyctl`, which is the official CLI used to interact with fly.io API. It's feature rich, and very easy to use. I hope all cloud platforms have something similar! You can install `flyctl` by following the Article on [their document](https://fly.io/docs/getting-started/installing-flyctl/) and [login](https://fly.io/docs/getting-started/log-in-to-fly/).

Now initialize the project:

```
➜ flyctl launch
Creating app in [:REDACTED:]/rust-demo-server
Scanning source code
Could not find a Dockerfile, nor detect a runtime or framework from source code. Continuing with a blank app.
? App Name (leave blank to use an auto-generated name): rust-demo-server
Automatically selected personal organization: [:REDACTED:]
? Select region: sin (Singapore)
Created app rust-demo-server in organization personal
Wrote config file fly.toml
```

Now your project tree should be something looks like:

```sh
├── Cargo.lock
├── Cargo.toml
├── fly.toml # This is the config file
├── src
│   └── main.rs
└── target
    ├── CACHEDIR.TAG
    └── debug
```

`fly.toml` is the [configuration file](https://fly.io/docs/reference/configuration/) for fly.io. We can declare our service in it. In this case, we say that our app will be listening on `8080` port, and have a `http_checks` endpoint at `/health`. By declaring two `ports` section, we can process both `http` and `https` requests while fly.io will handle dirty works like certification and tls termination. If you want to behave differently depend on protocol, like redirecting all http to https, an `X-Forwarded-Proto` header is provided. For more info, see [the reference](https://fly.io/docs/reference/runtime-environment/#request-headers).

```toml
# fly.toml

# ...

[[services]]
internal_port = 8080
protocol      = "tcp"

[[services.ports]]
handlers = ["http"]
port     = 80

[[services.ports]]
handlers = ["tls", "http"]
port     = 443

[[services.http_checks]]
path            = "/health"
method          = "get"
timeout         = "2000"
interval        = "10000"
protocol        = "http"
grace_period    = "5s"
tls_skip_verify = false
```

## Let docker be the bedrock

Like I just said, fly.io supports docker and buildpacks. Due the lack of support for rust from buildpacks [^1], we will use `Dockerfile` to deploy. Building the image can be very slow when it comes to Rust, which is already been criticized as "[having a slow build process](https://fasterthanli.me/articles/why-is-my-rust-build-so-slow)". Fortunately, docker can speed up the build process by caching most of the dependencies by using multi-stage.

[^1]: Actually there is [third party buildpack](https://github.com/emk/heroku-buildpack-rust) for rust, but it's old and not intended to be used in platforms other than heroku, so we will focus on docker for now.

```dockerfile
FROM rust:slim-buster AS builder

WORKDIR /prod
COPY Cargo.lock .
COPY Cargo.toml .
RUN mkdir .cargo
# This is the trick to speed up the building process.
RUN cargo vendor > .cargo/config

COPY . .
RUN cargo build --release

# Use any runner as you want
# But beware that some images have old glibc which makes rust unhappy
FROM fedora:34 AS runner
COPY --from=builder /prod/target/release/rust-demo-server /bin
```

Now deploy with a single command and make yourself a good cup of coffee (yeah it's gonna take a while):

```
➜ flyctl deploy
==> Verifying app config
--> Verified app config
==> Building image
Waiting for remote builder fly-builder-bitter-shadow-9435... ⢿
Remote builder fly-builder-bitter-shadow-9435 ready
==> Creating build context
--> Creating build context done
==> Building image with Docker
--> docker host: 20.10.12 linux x86_64
[+] Building 19.1s (0/1)
[+] Building 102.1s (15/15) FINISHED
 => [internal] load remote build context                                                            0.0s
 => copy /context /                                                                                 1.2s
 => [internal] load metadata for docker.io/library/fedora:34                                        2.7s
 => [internal] load metadata for docker.io/library/rust:slim-buster                                 4.7s
 => CACHED [runner 1/2] FROM docker.io/library/fedora:34@sha256:321dbc444dfeda328a85dc3c31545a65c1  0.0s
 => [builder 1/8] FROM docker.io/library/rust:slim-buster@sha256:93239770c3aa78048abafb5a15a48f2b  15.2s
 => => resolve docker.io/library/rust:slim-buster@sha256:93239770c3aa78048abafb5a15a48f2bbd7f8d9cb  0.0s
 => => sha256:93239770c3aa78048abafb5a15a48f2bbd7f8d9cb1eb54dad8cb30cf874cb416 984B / 984B          0.0s
 => => sha256:7651edbf826fcdde4106f21b91c69dded564eded4a0c10a54a85c02af279a0e3 742B / 742B          0.0s
 => => sha256:dc122e2d6d24555b65aa2fe8ed7bb2ff6adb40a94b330bf1ae63e04b9ca04554 4.85kB / 4.85kB      0.0s
 => => sha256:c32ce6654453d35d0b3dde45d195adeee586ffba0a683006ee06748c077c01fa 27.14MB / 27.14MB    1.1s
 => => sha256:7fe5746b0c0ab280da4d0b8cebd7139bbb1df33ca3fdfb7b403d33d06c55ddf 196.45MB / 196.45MB  11.9s
 => => extracting sha256:c32ce6654453d35d0b3dde45d195adeee586ffba0a683006ee06748c077c01fa           0.7s
 => => extracting sha256:7fe5746b0c0ab280da4d0b8cebd7139bbb1df33ca3fdfb7b403d33d06c55ddf6           3.2s
 => [builder 2/8] WORKDIR /prod                                                                     0.1s
 => [builder 3/8] COPY Cargo.lock .                                                                 0.0s
 => [builder 4/8] COPY Cargo.toml .                                                                 0.0s
 => [builder 5/8] RUN mkdir .cargo                                                                  0.2s
 => [builder 6/8] RUN cargo vendor > .cargo/config                                                 53.6s
 => [builder 7/8] COPY . .                                                                          0.5s
 => [builder 8/8] RUN cargo build --release                                                        26.2s
 => [runner 2/2] COPY --from=builder /prod/target/release/rust-demo-server /bin                     0.0s
 => exporting to image                                                                              0.0s
 => => exporting layers                                                                             0.0s
 => => writing image sha256:2ca526fa6dc9a454eeb7f0923f4aace75607985a7175e101831444b32a143723        0.0s
 => => naming to registry.fly.io/rust-demo-server:deployment-1653402912                             0.0s
--> Building image done
==> Pushing image to fly
The push refers to repository [registry.fly.io/rust-demo-server]
cf91ede3b588: Pushed
0d8ddbb4ec8b: Mounted from mail-list-rss
deployment-1653402912: digest: sha256:7de2e964dbef7448f23c0656c9f019f885b062aa2b27520396ed5fbe046566ca size: 740
--> Pushing image done
image: registry.fly.io/rust-demo-server:deployment-1653402912
image size: 183 MB
==> Creating release
--> release v2 created

--> You can detach the terminal anytime without stopping the deployment
==> Monitoring deployment

v0 is being deployed
```

::: tip
You can choose either building the image on your machine or with builders provided by fly.io. The trick is to use `--local-only` or `--remote-only` flag with `flyctl deploy`.
:::

Congratulations! You've successfully deployed your first image onto fly.io! We can verify this by requesting `YOUR_APP_NAME.fly.dev`.

```
➜ xh rust-demo-server.fly.dev
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8
Date: Tue, 24 May 2022 14:39:55 GMT
Server: Fly/ccc539245 (2022-05-20)
Transfer-Encoding: chunked
Via: 1.1 fly.io

Hello, world!
```

## Reference

- The demo server can be found on [Github](https://github.com/George-Miao/Rust-demo-server)
- [Fly.io document](https://fly.io/docs/)
