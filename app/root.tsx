import 'virtual:uno.css'
import '@styles/globals.css'
import '@vendor/styles/base-token.css'
import '@vendor/styles/base.css'
import '@vendor/styles/light-theme-token.css'
import '@vendor/styles/light-theme.css'
import '@unocss/reset/tailwind-v4.css'

import Footer from '@comps/footer'
import NavBar from '@comps/navbar'
import NotFoundPage from '@pages/404'
import ServerErrorPage from '@pages/500'
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from 'react-router'
import type { Route } from './+types/root'

export const links: Route.LinksFunction = () => [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png'
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png'
  },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  },
  { rel: 'manifest', href: '/site.webmanifest' },
  { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#be223a' }
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='msapplication-TileColor' content='#FFFFFF' />
        <meta name='theme-color' content='#be223a' />
        <Meta />
        <Links />
      </head>
      <body>
        <div className='min-h-screen bg-red-800 relative'>
          <NavBar />
          {/* Main container */}
          <main
            className={`
              relative
              pb-8
              sm:p-8
              !lt-md:pt-[max(12vh,9rem)]
              md:pt-[max(8vh,6rem)]
              lg:pt-8 lg:ml-56
            `}
          >
            {/* White Background, max-w-6xl */}
            <div
              className={`
                shadow-main min-h-[calc(100vh-12rem)]
                relative z-100 bg-light-100
                max-w-6xl mx-auto
                px-6 py-8
                sm:(px-16 py-20)
                md:(px-26 py-32)
                lg:min-h-[calc(100vh-9rem)]`}
            >
              {children}
            </div>
          </main>

          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundPage />
  }

  return <ServerErrorPage />
}
