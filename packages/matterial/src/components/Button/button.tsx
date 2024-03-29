import * as React from 'react'

import type { Variant, ColoredElement } from '../../interfaces/theme'
import classnames from '../../lib/classnames'
import useColor from '../../lib/use-color'
import { Link } from '../Link'

type Percent = `${number}%`

export interface CommonButtonProps extends ColoredElement {
  /**
   * Content to put on the RIGHT side of children/main content
   */
  append?: React.ReactNode

  /**
   * Main content
   */
  children: React.ReactNode

  /**
   * What is your name?
   */
  className?: string

  /**
   * Prevent button from triggering events
   */
  disabled?: boolean

  /**
   * Indicate if there is a loading process happening; Disables the button if true
   */
  loading?: boolean

  /**
   * Content to put on the LEFT side of children/main content
   */
  prepend?: React.ReactNode

  /**
   * Circle and square are ideal for icons or monograms
   */
  shape?: 'default' | 'square' | 'circle'

  /**
   * Size; Medium by default
   */
  size?: 'small' | 'medium' | 'large'

  /**
   * CSS style
   */
  style?: React.CSSProperties

  /**
   * A URL location; Changes the button into a hyperlink
   */
  to?: string

  /**
   * What is the airspeed velocity of an unladen swallow?
   */
  type?: 'button' | 'reset' | 'submit'

  /**
   * Visual style
   */
  variant?: Variant

  /**
   * Apply a fixed width
   */
  width?: number | Percent
}

type PolymorphicButton = React.ComponentType<any>

type OverloadedElementProps<T> = T extends React.ComponentType<infer P>
  ? P & CommonButtonProps
  : CommonButtonProps

type ButtonProps<T> = {
  as?: T
  children: React.ReactNode
} & OverloadedElementProps<T>

export const Button = React.forwardRef<
  PolymorphicButton,
  ButtonProps<React.ComponentType<any>>
>((props, ref) => {
  const {
    append,
    as: Component = 'button',
    children,
    className,
    color = 'default',
    disabled = false,
    loading = false,
    prepend,
    size = 'medium',
    shape,
    style: naturalStyle = {},
    to,
    type = 'button',
    variant = 'default',
    width,
    ...rest
  } = props

  const cssColor = useColor(color)

  const style = { ...naturalStyle, ...cssColor.style }
  if (typeof width === 'number') {
    style.width = `${width}px`
  } else if (typeof width === 'string') {
    // Percent
    style.width = width
  }

  const classNameString = classnames(
    'mt-input',
    'mt-button',
    cssColor.className,
    shape && `shape--${shape}`,
    `size--${size}`,
    `variant--${variant}`,
    !!to && 'no-hover',
    className
  )

  const content: JSX.Element = (
    <>
      {prepend && (
        <span className="prepend-content" aria-hidden>
          {prepend}
        </span>
      )}
      <span className="main-content">{children}</span>
      {append && (
        <span className="append-content" aria-hidden>
          {append}
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link href={to} className={classNameString} style={style}>
        {content}
      </Link>
    )
  }

  return (
    <Component
      type={type}
      className={classNameString}
      disabled={disabled || loading ? true : undefined}
      data-loading={loading ? 'true' : undefined}
      style={style}
      ref={ref}
      {...rest}
    >
      {content}
    </Component>
  )
})
