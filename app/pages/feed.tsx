import type { LoaderFunctionArgs } from 'react-router'

export async function loader({ params }: LoaderFunctionArgs) {
  const path = (params['*'] || '').replace(/^\//, '')

  if (path === 'posts.rss.xml') {
    const content = await import('virtual:feed:posts:rss2').then(
      mod => mod.default
    )
    return new Response(content, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8'
      }
    })
  }

  if (path === 'posts.atom.xml') {
    const content = await import('virtual:feed:posts:atom1').then(
      mod => mod.default
    )
    return new Response(content, {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8'
      }
    })
  }

  if (path === 'posts.json') {
    const content = await import('virtual:feed:posts:json1').then(
      mod => mod.default
    )
    return new Response(content, {
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8'
      }
    })
  }

  if (path === 'changelog.rss.xml') {
    const content = await import('virtual:feed:changelog:rss2').then(
      mod => mod.default
    )
    return new Response(content, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8'
      }
    })
  }

  if (path === 'changelog.atom.xml') {
    const content = await import('virtual:feed:changelog:atom1').then(
      mod => mod.default
    )
    return new Response(content, {
      headers: {
        'Content-Type': 'application/atom+xml; charset=utf-8'
      }
    })
  }

  if (path === 'changelog.json') {
    const content = await import('virtual:feed:changelog:json1').then(
      mod => mod.default
    )
    return new Response(content, {
      headers: {
        'Content-Type': 'application/feed+json; charset=utf-8'
      }
    })
  }

  return new Response('Not Found', { status: 404 })
}
