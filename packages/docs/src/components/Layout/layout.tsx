import { Button, Dialog, Icon, useDialog } from '../../../../matterial/src'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

import { RequiredChildren, OptionalChildren } from 'interfaces/children'
import { TITLE } from '../../../const'
import scrollToTop from 'utils/scroll-to-top'
import { capitalize, unKebabCase } from 'utils/string'
import useMediaQuery from 'utils/use-media-query'
import classes from './layout.module.scss'

export type LayoutProps = {
  fullWidth?: boolean
} & RequiredChildren

/** @deprecated Use Matterial's `Layout` components */
export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className={classes.container}>
      {!fullWidth ? (
        <div className={classes.containerNav}>{children}</div>
      ) : (
        children
      )}
    </div>
  )
}

/** @deprecated Use Matterial's `Layout` components */
export function Header({
  children,
  title,
}: OptionalChildren & { title: string }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            TITLE
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {children && <header className={classes.header}>{children}</header>}
    </>
  )
}

/** @deprecated Use Matterial's `Layout` components */
export function Heading({ children = TITLE }: OptionalChildren) {
  return <h1 className={classes.heading}>{children}</h1>
}

/** @deprecated Use Matterial's `Layout` components */
export function Navigation({ components }: { components: string[] }) {
  const { pathname } = useRouter()
  const pathnameRoot = pathname.split('/', 2).join('/')

  const isCurrentPage = (link: string) => link === pathnameRoot

  const isScreenMobile = useMediaQuery('(max-width: 680px)')

  const navContent = (
    <nav
      id="navigation__nav"
      aria-label="Main"
      className={`${classes.navigation} ${
        !isScreenMobile && classes.navigationScreen
      }`}
    >
      <Heading />
      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="/setup">Getting Started</Link>
        </li>
      </ul>
      <h5>Components</h5>
      <ul>
        {components.map(slug => (
          <li
            key={slug}
            className={isCurrentPage(slug) ? 'current' : undefined}
          >
            <Link href={`/components/${slug}`} legacyBehavior>
              {capitalize(unKebabCase(slug))}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  if (isScreenMobile) {
    return <DialogNav>{navContent}</DialogNav>
  }

  return navContent
}

/** @deprecated Use Matterial's `Layout` components */
function DialogNav({ children }: RequiredChildren) {
  const { active, open, close } = useDialog(false)

  return (
    <>
      <Button
        shape="circle"
        onClick={open}
        className={classes.menuButton}
        size={54}
      >
        <Icon icon="Menu" size={54} />
      </Button>
      <Dialog
        active={active}
        closable
        onDismiss={close}
        labelledBy="navigation__nav"
      >
        {children}
      </Dialog>
    </>
  )
}

/** @deprecated Use Matterial's `Layout` components */
export function Main({ children }: RequiredChildren) {
  return <main className={classes.main}>{children}</main>
}

/** @deprecated Use Matterial's `Layout` components */
export function Footer({ children }: OptionalChildren) {
  return (
    <footer className={classes.footer}>
      <Button
        shape="circle"
        className={classes.scrollToTop}
        onClick={scrollToTop}
      >
        <Icon icon="ArrowToTop" />
      </Button>
      {children}
    </footer>
  )
}
