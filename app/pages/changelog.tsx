import changelogs from 'virtual:changelog'
import ChangeLogItem from '@comps/changelog/changelogItem'
import SafeArea from '@comps/layout/safeArea'
import SEO from '@comps/seo'
import Title from '@comps/title'

export default function ChangelogPage() {
  const len = changelogs.length
  return (
    <SafeArea>
      <SEO title='Changelog' />

      <Title
        title='Changelog'
        subtitle='Changelog of mine, not limited to Glog updates.'
      />

      <section className='grid '>
        {changelogs.map((changelog, id) => {
          if (id === len - 1)
            return (
              <ChangeLogItem
                key={changelog.title}
                {...changelog}
                bottomLine={false}
              />
            )
          return <ChangeLogItem key={changelog.title} {...changelog} />
        })}
      </section>
    </SafeArea>
  )
}
