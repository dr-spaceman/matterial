import { Page, Article } from '../../../matterial/src'
import metadata_ from 'utils/metadata'
import { Mdx } from 'components/Mdx'
import { compileMdx } from 'utils/mdx'
import navMap from 'lib/nav-map'

const source = `To begin, install the package.

\`npm i matterial\`

Use Matterial's \`<Html>\` and \`<Body>\` components in your layout:

\`\`\`jsx
// app/layout.tsx

import { Html, Body } from 'matterial'
import 'src/styles/main.scss' // Your additional styles

export default function Layout({ children }) {
  return (
    <Html>
      <Body>{children}</Body>
    </Html>
  )
}
\`\`\`

Use Matterial's \`<Page>\` component in your page:

\`\`\`jsx
// app/page.tsx

import { Page } from 'matterial'

export default function AppPage() {
  return (
    <Page>
      Hello, world
    </Page>
  )
}
\`\`\`

Import components to use them in your app:

\`\`\`jsx
// src/components/my-component.tsx

import { Button, Container } from 'matterial'

export default function MyComponent() {
  return (
    <Container row>
      <Button variant="contained" color="primary">Foo</Button>
      <Button variant="contained" color="secondary">Bar</Button>
    </Container>
  )
}
\`\`\``

export const metadata = metadata_({ title: 'Matterial UI -- Getting Started' })

export default async function SetupPage() {
  const { compiledSource } = await compileMdx(source)

  return (
    <Page nav={navMap}>
      <Article title="Setup">
        <Mdx source={compiledSource} />
      </Article>
    </Page>
  )
}