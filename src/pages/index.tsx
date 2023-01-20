import Image from 'next/image'

import Button from '@comps/button'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'
import config from '@config'
import { defineFC } from '@core/helper'
import { generateAllFeeds } from '@core/post/feed'
import content from '@styles/content.module.css'

import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  await generateAllFeeds()
  return {
    props: {}
  }
}

const Home = defineFC(() => {
  return (
    <SafeArea>
      <Title title="Hi, I'm George Miao" safeArea />
      <br />
      <p className='flex gap-2 <sm:(flex-col gap-1) '>
        <a href='https://github.com/George-Miao'>
          <Image
            src='https://img.shields.io/badge/Github-George--Miao-be223a?style=for-the-badge&logo=Github'
            alt='github'
            height={30}
            width={200}
            unoptimized
          />
        </a>
        <a href='mailto:gm@miao.dev'>
          <Image
            src='https://img.shields.io/badge/Email-gm@miao.dev-blue?style=for-the-badge&logo=Mail.Ru'
            alt='github'
            height={30}
            width={200}
            unoptimized
          />
        </a>
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
