---
title: Some example TSX for highlight
created: 2022-01-22 02:47:53
categories: [ChitChat]
tags: [en-US, WIP]
---

```ts
import { defineVFCWithChild } from '@core/helper'
import Footer from '../footer'
import NavBar from '../navbar'

/**
 * When using layout, it is recommended to use
 * SafeArea inside for constrain the max width to 3xl
 *
 * Here I use 6xl for background for the sake of aesthetics
 * however content should
 * not take the entire <main />
 */
const Layout = defineVFCWithChild(({ children, className }) => {
  return (
    <div className='min-h-screen
      bg-red-800 relative
      '>
      <NavBar />

      {/* Main container */}
      <main
        className={`
          relative
          pb-8 pt-[max(8vh,6rem)]
          sm:(p-8 pt-[max(8vh,6rem)])
          lg:(pt-8 ml-56)
        `}
      >
        {/* White Background, max-w-6xl */}
        <div
          className={`${className ?? ''}
            shadow-main min-h-[calc(100vh-12rem)]
            relative z-100 bg-light-100
            max-w-6xl mx-auto
            px-6 py-8
            sm:(px-16 py-20)
            md:(px-26 py-32)
            lg:min-h-[calc(100vh-8rem)]`}
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
})

export default Layout
```

```rust
use std::{collections::HashMap, net::SocketAddr, str::FromStr};

use anyhow::Result;
use axum::{
    extract::{Extension, Path},
    handler::Handler,
    http::{
        header::{self, HeaderName, CONTENT_TYPE},
        uri::{Authority, Scheme},
        HeaderValue, Request, StatusCode,
    },
    response::{Headers, Html, IntoResponse, Redirect, Response},
    routing::{any, get},
    AddExtensionLayer, Json, Router,
};
use axum_extra::middleware::{middleware_fn, Next};
use chrono::Utc;
use futures::{StreamExt, TryStreamExt};
use mongodb::{bson::doc, options::FindOptions};
use tower_http::{
    cors,
    set_header::SetResponseHeaderLayer,
    trace::{OnRequest, OnResponse, TraceLayer},
};
use tracing::{info, Level};

use crate::{
    config::get_config,
    db::{Feeds, List, Summary},
};

fn utf8_header(res: &Response) -> Option<HeaderValue> {
    if let Some(header) = res.headers().get(CONTENT_TYPE) {
        if let Ok(header) = header.to_str() {
            if !header.ends_with("charset=utf-8") {
                let mut ret = header.to_owned();
                ret.push_str("; charset=utf-8");
                return HeaderValue::from_str(&ret).ok();
            }
        }
    }
    None
}

async fn http_rediretor<B>(req: Request<B>, next: Next<B>) -> impl IntoResponse {
    let config = get_config();

    match req
        .headers()
        .get(HeaderName::from_lowercase(b"x-forwarded-proto").unwrap())
    {
        Some(schema) if schema.to_str().map(|x| x != "https").unwrap_or(true) => {
            let mut parts = req.uri().clone().into_parts();
            parts.scheme = Some(Scheme::HTTPS);
            parts.authority = Some(Authority::from_str(&config.domain).expect("Bad domain"));
            Err(Redirect::permanent(parts.try_into().unwrap()))
        }
        _ => Ok(next.run(req).await),
    }
}

#[derive(Copy, Clone)]
struct Logger {}

impl<B> OnRequest<B> for Logger {
    fn on_request(&mut self, request: &axum::http::Request<B>, _: &tracing::Span) {
        let route = request.uri().path();
        tracing::event!(target: "web", Level::INFO, route);
    }
}

impl<B> OnResponse<B> for Logger {
    fn on_response(
        self,
        response: &axum::http::Response<B>,
        latency: std::time::Duration,
        _: &tracing::Span,
    ) {
        let status = response.status().as_u16();
        let time = latency.as_secs_f32();
        tracing::event!(target: "web", Level::INFO, status, time)
    }
}

pub async fn web_server(collection: Feeds) -> Result<()> {
    let logger = Logger {};

    let utf8_layer = SetResponseHeaderLayer::overriding(CONTENT_TYPE, utf8_header);

    let app = Router::new()
        .route("/", get(index))
        .route("/feeds/:key", get(raw))
        .route("/feeds", get(list.layer(utf8_layer)))
        .route("/rss", get(rss))
        .layer(AddExtensionLayer::new(collection))
        .layer(
            TraceLayer::new_for_http()
                .on_request(logger)
                .on_response(logger),
        )
        .route("/health", any(|| async { "OK" }))
        .route_layer(middleware_fn::from_fn(http_rediretor))
        .route_layer(
            cors::CorsLayer::new()
                .allow_headers(cors::any())
                .allow_methods(cors::any())
                .allow_origin(cors::any()),
        );

    let addr = SocketAddr::from(([0, 0, 0, 0], get_config().web_port));

    info!(target: "web", "Starting");

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    info!(target: "web", "Stopped");

    Ok(())
}

async fn index() -> impl IntoResponse {
    Html(include_str!("../front/dist/index.html"))
}

async fn rss(Extension(feed): Extension<Feeds>) -> impl IntoResponse {
    match render_feeds(feed).await {
        Ok(content) => (
            StatusCode::OK,
            Headers(vec![(
                header::CONTENT_TYPE,
                "application/xml; charset=utf-8",
            )]),
            content,
        ),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Headers(vec![]),
            e.to_string(),
        ),
    }
}

async fn render_feeds(feeds: Feeds) -> Result<String> {
    let config = get_config();
    let option = FindOptions::builder()
        .limit(config.per_page as i64)
        .sort(doc! { "created_at": -1 })
        .build();
    let feeds = feeds
        .find(None, option)
        .await?
        .try_fold(Vec::with_capacity(10), |mut acc, x| async move {
            acc.push(x.into_rss());
            Ok(acc)
        })
        .await?;

    let ret = rss::ChannelBuilder::default()
        .title("Mail List")
        .generator(Some("http://github.com/George-Miao/mail-list-rss".into()))
        .link("http://github.com/George-Miao/mail-list-rss")
        .pub_date(Utc::now().to_rfc2822())
        .items(feeds)
        .build()
        .to_string();
    Ok(ret)
}

async fn list(Extension(feeds): Extension<Feeds>) -> impl IntoResponse {
    Json(render_list(feeds).await.unwrap())
}

async fn render_list(feeds: Feeds) -> Result<List> {
    let res = feeds
        .find(
            None,
            FindOptions::builder()
                .sort(doc! { "created_at": -1 })
                .build(),
        )
        .await?
        .filter_map(|x| async move {
            x.ok().map(|x| Summary {
                create_at: x.created_at.to_rfc2822(),
                title: x.title,
                id: x.id,
            })
        })
        .collect::<Vec<_>>()
        .await;

    Ok(List { items: res })
}

async fn raw(
    Path(map): Path<HashMap<String, String>>,
    Extension(feeds): Extension<Feeds>,
) -> impl IntoResponse {
    let key = map.get("key").expect("key should exist");
    let res = feeds.find_one(doc! { "id" : key }, None).await;
    match res {
        Ok(Some(res)) => (
            StatusCode::OK,
            Headers(vec![(header::CONTENT_TYPE, "text/html; charset=utf-8")]),
            res.content,
        ),
        Ok(None) => (
            StatusCode::NOT_FOUND,
            Headers(vec![]),
            format!("Cannot find {}", key),
        ),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Headers(vec![]),
            e.to_string(),
        ),
    }
}
```
