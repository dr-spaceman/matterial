import { createContext } from 'react'

type RequiredLinkProps = {
  href: any // Could be something like a UrlObject
}
type LinkProps = RequiredLinkProps & {
  ref?: React.ForwardedRef<HTMLAnchorElement> // Not sure why this needs to be here, but it does
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof RequiredLinkProps>
/**
 * @example
 * const a: AppConfig = { linkComponent: 'a' }
 * const b: AppConfig = { linkComponent: NextLink }
 * const c: AppConfig = {
 *   linkComponent: (p: { href: string } & RequiredChildren) => (
 *     <a href={p.href}>{p.children}</a>
 *   ),
 * }
 */
export type AppConfig = {
  /** Title of your app */
  appTitle?: string

  /* Inject a custom link component */
  linkComponent?:
    | string
    | ((props: LinkProps) => JSX.Element)
    | React.ComponentType<LinkProps>
    | React.ForwardRefExoticComponent<LinkProps>
}
type DefinedAppConfig = Required<AppConfig>

export const defaultAppConfig: DefinedAppConfig = {
  appTitle: 'Matterial App',
  linkComponent: 'a',
}

const AppContext = createContext<DefinedAppConfig>(defaultAppConfig)

export default AppContext
