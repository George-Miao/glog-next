import {
  type RouteConfig,
  index,
  prefix,
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
  ])
] satisfies RouteConfig
