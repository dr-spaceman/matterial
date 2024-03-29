'use client'

import * as matterial from '../../../../matterial/src'
import * as matterialExamples from '../../../../matterial/src/components/examples'
// import { getMDXComponent } from 'mdx-bundler/client'
// import { ComponentMap } from 'mdx-bundler/dist/client.d'
import { MDXRemote /*, MDXRemoteSerializeResult*/ } from 'next-mdx-remote'

const { CodeBlock } = matterial

// import { components } from './mdxComponents'

import * as constants from '../../../../matterial/src/const'

export function Mdx({ source }: { source: string }): JSX.Element {
  // const Component = useMemo(() => getMDXComponent(source), [source])
  // // NOTE: cheated here with TS type but it's hard to satisfy otherwise as it
  // // requires all props to be optional which gives up on any type safety.
  // return <Component components={components as unknown as ComponentMap} />
  return (
    <MDXRemote
      compiledSource={source}
      scope={constants}
      // @ts-ignore
      components={{
        ...matterial,
        ...matterialExamples,
        pre: ({ children, ...props }) => (
          <CodeBlock {...props}>{children}</CodeBlock>
        ),
        // code: props => <Code {...props} />,
      }}
    />
  )
}
