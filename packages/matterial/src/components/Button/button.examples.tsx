import * as React from 'react'
import { Button } from './button'
import { Icon } from '../Icon'

export function LoadingButtonExample() {
  const [loading, setLoading] = React.useState(false)

  const toggleLoading = () => {
    if (!loading) {
      setTimeout(() => setLoading(false), 2000)
    }

    setLoading(!loading)
  }

  return (
    <>
      <Button loading={loading} onClick={() => toggleLoading()}>
        Click Me
      </Button>
      <Button shape="circle" loading={loading} onClick={() => toggleLoading()}>
        <Icon
          icon="loader"
          style={{
            ...(loading && { animation: 'spin 1s ease-in-out infinite' }),
          }}
        />
      </Button>
    </>
  )
}

export function OverloadedButtonExample() {
  type FooProps = { foo: string }
  const Foo = ({ foo }: FooProps) => <button data-foo={foo}>foo</button>

  return (
    <Button as={Foo} foo="foo">
      button
    </Button>
  )
}
