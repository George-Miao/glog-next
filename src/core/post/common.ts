export const postsDir = `${process.cwd()}/content/posts`

export const slugPattern = /.*\/(.*?)\.md/i

export const blockExcerptPattern =
  /<!--\s*block\s*-->([\s\S]*)<!--\s*block\s*-->/i

export const moreExcerptPattern = /([\s\S]*)<!--\s*more\s*-->/i
