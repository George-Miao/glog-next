import Badge from '@comps/badge'
import Button from '@comps/button'
import { DotList } from '@comps/dotList'
import SafeArea from '@comps/layout/safeArea'
import Title from '@comps/title'
import config from '@config'
import content from '@styles/content.module.css'

export default function Home() {
  return (
    <SafeArea>
      <Title title="Hi, I'm George Miao" safeArea />
      <br />
      <p className='flex flex-col gap-2 sm:flex-row'>
        <Badge
          text='George-Miao'
          icon='mdi:github'
          url='https://github.com/George-Miao'
        />
        <Badge
          text='gm@miao.dev'
          icon='material-symbols:mail-rounded'
          url='mailto:gm@miao.dev'
        />
        <Badge text='Resume' icon='mdi:resume' url='./resume.pdf' />
      </p>
      <div className={`${content.content} mt-4 md:mt-8`}>
        <p>
          I&rsquo;m a master student and developer at the University of
          Maryland.
        </p>
      </div>

      <DotList items={config.education} title='Education' />
      <DotList items={config.professional} title='Experience' />
      <DotList items={config.links} title='Link exchange' className='mb-16' />
      <Button
        href='/writing'
        className='ml-auto text-sm w-36'
        style='underline'
        postfix='→'
      >
        View Writing
      </Button>
    </SafeArea>
  )
}
