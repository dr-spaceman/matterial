import type { NavMap } from '../../../matterial/src'
import { PageNav } from '../../../matterial/src'
import { getDocsFiles } from 'utils/mdx'
import { capitalize, unKebabCase } from 'utils/string'
import Heading from 'components/Heading'

const components = getDocsFiles().map(fileName =>
  fileName.replace('.docs.mdx', '')
)

const navMap: NavMap = {
  _heading: <Heading />,
  _: [
    { href: '/', title: 'Homepage' },
    { href: '/setup', title: 'Setup' },
    { href: '/layout', title: 'Page layout' },
  ],
  Components: components.map(slug => ({
    href: `/components/${slug}`,
    title: capitalize(unKebabCase(slug)),
  })),
}

export default function SiteNav(): JSX.Element {
  return <PageNav nav={navMap} />
}
