import Button from '@comps/button'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'
import config from '@config'
import { defineFC } from '@core/helper'
import { generateAllFeeds } from '@core/post/feed'
import content from '@styles/content.module.css'

import type { GetStaticProps } from 'next'
import { Icon } from '@iconify/react'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
  await generateAllFeeds()
  return {
    props: {}
  }
}

const Badge = defineFC<{
  text: string
  url: string
  icon: string
  rel?: string
}>(({ text, url, icon, rel }) => {
  return (
    <Link
      rel={rel}
      href={url}
      className='flex text-neutral-500 leading-6 inl-inset-y-px items-center hover:text-red-800'
    >
      <Icon icon={icon} className='mr-1 text-neutral-600' width={20} />
      <span className='font-mono underline'>{text}</span>
    </Link>
  )
})

const Home = defineFC(() => {
  return (
    <SafeArea>
      <Title title="Hi, I'm George Miao" safeArea className='mt-4 mb-8' />
      <br />
      <p className='flex gap-2 '>
        <Badge
          text='George-Miao'
          icon='mdi:github'
          url='https://github.com/George-Miao'
        />
        <Badge
          rel='me'
          text='@Pop@miao.dev'
          icon='mdi:mastodon'
          url='https://mastodon.miao.dev/@pop'
        />
        <Badge
          text='Gm@miao.dev'
          icon='material-symbols:mail-rounded'
          url='mailto:gm@miao.dev'
        />
      </p>
      <div className={`${content.content} mt-4 md:mt-8`}>
        <p>
          I&rsquo;m an undergraduate student and developer currently at Syracuse
          University. Languages used most are Rust and Typescript.
        </p>
      </div>

      <DotList items={config.resumeList} title='Resume' className='mb-16' />
      <DotList
        items={config.linksList}
        title='Link exchange'
        className='mb-16'
      />
      <Button
        href={'/writing'}
        className='ml-auto text-sm w-36'
        style='underline'
        postfix='→'
      >
        View Writing
      </Button>
    </SafeArea>
  )
})

export default Home
