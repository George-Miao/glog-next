/* eslint-disable @typescript-eslint/no-var-requires */

import MarkdownIt from 'markdown-it'
import { config } from './config'

const anchor = require('markdown-it-anchor')

export const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
  .use(require('markdown-it-highlightjs'), { auto: false })
  .use(anchor, { permalink: anchor.permalink.headerLink() })
  .use(require('markdown-it-image-lazy-loading'))
  .use(require('markdown-it-plain-text'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-container'), 'info')
  .use(require('markdown-it-container'), 'success')
  .use(require('markdown-it-container'), 'danger')
  .use(require('markdown-it-container'), 'error')
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-imsize'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-regexp'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-task-checkbox'))
  .use(require('markdown-it-external-links'), {
    internalDomains: [config.domain],
    externalRel: 'external nofollow'
  })
  .use(require('markdown-it-latex2img'))
