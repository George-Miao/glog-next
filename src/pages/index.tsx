import Image from 'next/image'
import Link from 'next/link'

import Button from '@comps/button'
import { defineDotListItems, DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'
import { definePage } from '@core/helper'
import { generateAllFeeds } from '@core/post/feed'
import { Icon } from '@iconify/react'
import content from '@styles/content.module.css'

import type { GetStaticProps } from 'next'

const resumeList = defineDotListItems([
  {
    title: 'Syracuse University',
    value: '2020 - Now',
    subtitle: 'Undergraduate'
  },
  {
    title: 'Moseeker Shanghai',
    value: '2021',
    subtitle: 'Intern as frontend dev'
  },
  {
    title: 'Syracuse University',
    value: '2020 - 2021',
    subtitle: 'Research assistant'
  },
  {
    title: 'Cornell University',
    value: '2020 Summer',
    subtitle: 'SCE Precollege program'
  },
  {
    title: 'Georegtown University',
    value: '2019 Summer',
    subtitle: 'HOYA summer'
  },
  { title: 'Montverde Academy', value: '2018 - 2020', subtitle: 'Highschool' }
])

const linksList = defineDotListItems([
  {
    title: 'NovaDNG',
    value: 'NovaDNG.studio',
    link: 'https://novadng.studio',
    subtitle: '字体学徒'
  }
])

const mapImage = {
  src: 'https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/e0f525ed-8419-4e08-1ebf-b7a1eb208300/public',
  placeholder:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AABFlAB9i5e+YpDFboW9cXezcmyqcm2fYQBvhAAkYQAASpgfmI2z1XOy3XyVx2Z8uH14rWtelmoAQX0ADFEAAD+Rca6J1ueRp9B5pdBpjr5vkrtlAGpyACFwAA5SAAA/kQB8neDsn8Llia3aeJfNXYnBZABOhAAbZgALUAAARZQAWKGr3bb//6qv25E3m5c6oaIATIwAF2AACE7N5kOMxiFKnAAAAABJRU5ErkJggg=='
}

const tharsisImage = {
  src: 'https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/9a60b7f0-9440-48dd-432d-7d6c1d498900/public',
  placeholder:
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQG/8QAIhAAAQMDAwUAAAAAAAAAAAAAAgEDEQAEBQYHIRMiUnGB/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABkRAQACAwAAAAAAAAAAAAAAAAEAAhJBcf/aAAwDAQACEQMRAD8AzGx+rMyy+1avZi7ZxqXAqTaLASpyRKseKRH2lTaLbBt8EABFOqR8JHdzz7pRsg1EXFu9n//Z'
}

export const getStaticProps: GetStaticProps = async () => {
  await generateAllFeeds()
  return {
    props: {}
  }
}

const emClass = `w-full inline-block
my-2 px-4
flex flex-row items-center
text-warm-gray-600`

const Home = definePage(() => {
  return (
    <SafeArea>
      <Title title="Hi, I'm George Miao" safeArea />
      <br />
      <p className='flex gap-2'>
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
          I&rsquo;m an undergraduate student and developer currently at Syracuse University. Languages used most are
          Rust and Typescript. Trying out new stuff everyday!
        </p>
        <br />
        <h3 className='my-6'>Wait, where is it?</h3>
        <Image
          className='transition-all'
          alt='Map of my location'
          layout='intrinsic'
          src={mapImage.src}
          blurDataURL={mapImage.placeholder}
          placeholder='blur'
          width={1112}
          height={590}
          about='Syracuse, NY'
        />
        <em className={emClass}>
          <div className='flex-grow' />
          <Icon
            icon='akar-icons:location'
            width={14}
            height={14}
            className='inline mr-2 ml-auto'
          />
          <span className='text-xs md:text-sm'>Syracuse, NY</span>
        </em>
        <br />
        <p>
          And, let me proudly introduce you, my home server rack, <b>Tharsis:</b>
        </p>

        <Image
          className='transision-all'
          alt='Photo of Tharsis'
          src={tharsisImage.src}
          placeholder='blur'
          blurDataURL={tharsisImage.placeholder}
          width={3024}
          height={4032}
        />

        <p className='mt-8'>
          It&apos;s in China so currently I&apos;m not able to access it, physically. But with Cloudflare Tunnel, I can
          still access{' '}
          <Link href='/projects'>
            <a>services runs on it</a>
          </Link>{' '}
          and use ssh. So I&apos;m happy with it. After all I don&apos;t have a public IP address and basically
          everything in China is behind NAT.
        </p>
      </div>

      <DotList items={resumeList} title='Resume' className='mb-16' />
      <DotList items={linksList} title='Link exchange' className='mb-16' />
      <Button
        href={'/writing'}
        className='ml-auto w-36 text-sm'
        style='underline'
        postfix='→'
      >
        View Writing
      </Button>
    </SafeArea>
  )
})

export default Home
