import type { ArticleItem } from '@type/article'
import { renderAllPost } from './post/reduce'

export const renderCategories = () =>
  renderAllPost().then(posts => {
    const categories: Record<string, ArticleItem[]> = {}

    for (const { meta, slug } of posts) {
      const item: ArticleItem = {
        created: meta.created,
        title: meta.title,
        slug
      }
      for (const cat of meta.categories) {
        if (categories[cat]) categories[cat].push(item)
        else categories[cat] = [item]
      }
    }

    return Object.entries(categories).map(([cat, items]) => {
      return {
        name: cat,
        items
      }
    })
  })
