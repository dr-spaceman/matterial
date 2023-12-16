import * as React from 'react'
import { Alert as ReachAlert } from '@reach/alert'
import { Icon } from '../Icon'

import { Severity, Variant } from '../../interfaces/theme'
import classnames from '../../lib/classnames'
import cssColor from '../../lib/css-color'
import { Button } from '../Button'
import classes from './alert.module.scss'

const LABELS = {
  error: 'Error',
  warning: 'Warning',
  success: 'Success',
}
const ICONS = {
  error: <Icon icon="Error" />,
  warning: <Icon icon="Warning" />,
  success: <Icon icon="Success" />,
  info: <Icon icon="Info" />,
}

type AlertIcon = boolean | React.ReactElement

export type AlertDispatch = {
  /**
   * A button or other call to action
   */
  action?: string | React.ReactElement

  /**
   * Append an action to dismiss the alert; Overwritten by `action`
   */
  dismiss?: boolean

  /**
   * Display an icon; Differs by severity, or indicate custom; Default: false
   */
  icon?: AlertIcon

  /**
   * Prefix a short phrase; Defaults to a phrase based on severity, or suppress with false
   */
  label?: boolean | string

  /**
   * A short message to show; Nullable for use in useAlert hook
   */
  message: string | null

  /**
   * Describes the type of alert
   */
  severity?: Severity

  /**
   * Controls whether the assistive technology should read immediately
   * ("assertive") or wait until the user is idle ("polite"); Default: 'polite'
   */
  type?: 'polite' | 'assertive'

  /**
   * Style variants
   */
  variant?: Variant
}

export type AlertProps = Partial<AlertDispatch> & {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/**
 * Regenerate a React element with the prop `size` small
 */
function shrink(component: string | React.ReactElement) {
  if (React.isValidElement(component)) {
    return React.cloneElement(component as React.ReactElement<any>, {
      size: 'small',
    })
  }

  return component
}

export function Alert({
  action,
  children,
  className,
  dismiss = false,
  icon = false,
  label: naturalLabel = true,
  message: naturalMessage,
  severity,
  style: naturalStyle = {},
  type,
  variant = 'outlined',
}: AlertProps): JSX.Element {
  const classNames = classnames(
    classes.alert,
    `variant--${variant}`,
    severity && `color--${severity}`,
    className
  )

  let [message, setMessage] = React.useState(children || naturalMessage)

  if (dismiss && !action) {
    action = (
      <Button
        variant="outlined"
        color={severity}
        onClick={() => setMessage(null)}
      >
        Dismiss
      </Button>
    )
  }

  if (!message) {
    return <></>
  }

  let label: any
  if (naturalLabel === true && severity) {
    // @ts-ignore
    label = severity in LABELS ? LABELS[severity] : null
  } else if (typeof naturalLabel === 'string') {
    label = naturalLabel
  }

  const color = severity || 'default'
  const style = { ...naturalStyle, '--color': cssColor(color) }

  return (
    <ReachAlert
      type={type}
      className={classNames}
      role="alert"
      // aria-label={label || severity || 'alert'}
      data-severity={severity}
      style={style}
    >
      <>
        {icon && <AlertIcon icon={icon} severity={severity} />}
        <div className={classes.content}>
          <div className={classes.message}>
            {!!label && <strong className={classes.label}>{label}: </strong>}
            {message}
          </div>
          {action && <div className={classes.action}>{shrink(action)}</div>}
        </div>
      </>
    </ReachAlert>
  )
}

function AlertIcon({
  icon,
  severity,
}: {
  icon: AlertIcon
  severity?: Severity
}): JSX.Element | null {
  if (icon === true) {
    // Return icon by severity, or default icon
    if (!severity || !ICONS[severity]) {
      severity = 'info'
    }
    return (
      <div className={classes.icon} aria-hidden="true">
        {ICONS[severity]}
      </div>
    )
  }

  // Return custom icon
  return (
    <div className={classes.icon} aria-hidden="true">
      {icon}
    </div>
  )
}
