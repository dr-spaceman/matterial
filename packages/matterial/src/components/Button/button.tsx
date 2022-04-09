import { forwardRef } from 'react'

import { Color, Variant } from '../../interfaces/theme'
import {
  OverloadedElement,
  OverloadedElementProps,
} from '../../interfaces/OverloadedElement'
import classnames from '../../lib/classnames'
import cssColor from '../../lib/css-color'
import { Link } from '../Link'

type Percent = `${number}%`

export interface CommonButtonProps {
  /**
   * Stuff to put on the right side of children/main content
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
   * What is your favorite color?
   */
  color?: Color | string
  /**
   * Prevent button from triggering events
   */
  disabled?: boolean
  /**
   * Indicate if there is a loading process happening; Disables the button if true
   */
  loading?: boolean
  /**
   * Stuff to put on the left side of children/main content
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

type NativeAttrs = Omit<
  React.ComponentPropsWithRef<'button'>,
  keyof CommonButtonProps
>
type NativeButtonProps = CommonButtonProps & NativeAttrs & { as?: never } // Make `as` never to distinguish with overloaded element
type OverloadedButtonProps = CommonButtonProps &
  Required<OverloadedElementProps> // Make `as` required to distinguish with native button element

export type ButtonProps = NativeButtonProps | OverloadedButtonProps
interface PolymorphicButton extends OverloadedElement<OverloadedButtonProps> {
  (props: NativeButtonProps): JSX.Element
}

export const Button: PolymorphicButton = forwardRef(
  (props: ButtonProps, ref: any) => {
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

    const style = { ...naturalStyle, '--color': cssColor(color) }
    if (typeof width === 'number') {
      style.width = `${width}px`
    } else if (typeof width === 'string') {
      // Percent
      style.width = width
    }

    const classNameString = classnames(
      'button', // Give access to global button style shared with other inputs
      `color--${color}`,
      shape && `shape--${shape}`,
      `size--${size}`,
      `variant--${variant}`,
      !!to && 'no-hover',
      className
    )

    const content = (
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
  }
) as any
