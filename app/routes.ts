import {
  index,
  prefix,
  type RouteConfig,
  route
} from '@react-router/dev/routes'

export default [
  index('./pages/main.tsx'),
  route('changelog', './pages/changelog.tsx'),
  route('thingy', './pages/thingy.tsx'),
  route('projects', './pages/projects.tsx'),
  ...prefix('writing', [
    index('./pages/writing/main.tsx'),
    route('categories', './pages/writing/categories.tsx'),
    route('tags', './pages/writing/tags.tsx'),
    route(':slug', './pages/writing/content.tsx')
  ]),
  route('sitemap.xml', './pages/sitemap.tsx'),
  route('robot.txt', './pages/robot.txt.tsx'),
  route('404', './pages/404.tsx'),
  route('feeds/*', './pages/feed.tsx')
] satisfies RouteConfig
