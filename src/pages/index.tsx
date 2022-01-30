import Button from '@comps/button'
import type { DotListItemProp } from '@comps/dotList'
import { DotList } from '@comps/dotList'
import Title from '@comps/title'
import { definePage } from '@core/helper'
import { Icon } from '@iconify/react'
import content from '@styles/content.module.css'
import Image from 'next/image'

const resumeList: DotListItemProp[] = [
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
]

const image = {
  src: 'https://imagedelivery.net/b21oeeg7p6hqWEI-IA5xDw/e0f525ed-8419-4e08-1ebf-b7a1eb208300/public',
  placeholder:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AABFlAB9i5e+YpDFboW9cXezcmyqcm2fYQBvhAAkYQAASpgfmI2z1XOy3XyVx2Z8uH14rWtelmoAQX0ADFEAAD+Rca6J1ueRp9B5pdBpjr5vkrtlAGpyACFwAA5SAAA/kQB8neDsn8Llia3aeJfNXYnBZABOhAAbZgALUAAARZQAWKGr3bb//6qv25E3m5c6oaIATIwAF2AACE7N5kOMxiFKnAAAAABJRU5ErkJggg=='
}

const Home = definePage(() => {
  return (
    <>
      <Title title="Hi, I'm George Miao" safeArea />
      <br />
      <div className={`${content.content} mt-4 md:mt-8`}>
        <p>
          I&rsquo;m an undergraduate student and developer currently at Syracuse
          University. Languages used most are Rust and Typescript. Trying out
          new stuff everyday!
        </p>
        <br />
        <h3 className="my-6">Wait, where is it?</h3>
        <Image
          className="transition-all "
          alt="Map of location"
          layout="intrinsic"
          src={image.src}
          blurDataURL={image.placeholder}
          placeholder="blur"
          width={1112}
          height={590}
          about="Syracuse, NY"
        />
        <em
          className="w-full inline-block
            my-2 px-4
            flex flex-row items-center
            text-warm-gray-600"
        >
          <div className="flex-grow" />
          <Icon
            icon="akar-icons:location"
            width={14}
            height={14}
            className="inline mr-2 ml-auto"
          />
          <span className="text-xs md:text-sm">Syracuse, NY</span>
        </em>
      </div>

      <DotList items={resumeList} title="Resume" className="mb-16" />
      <Button
        href={'/writing'}
        className="ml-auto w-36 text-sm"
        style="underline"
        postfix="→"
      >
        View Writing
      </Button>
    </>
  )
})

export default Home
