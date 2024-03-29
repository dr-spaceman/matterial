export type Accent =
  | 'accent-1'
  | 'accent-2'
  | 'accent-3'
  | 'accent-4'
  | 'accent-5'
  | 'accent-6'
  | 'accent-7'
  | 'accent-8'

export type Color =
  | NamedColor
  | Severity
  | 'default'
  | 'primary'
  | 'secondary'
  | 'red'
  | 'green'
  | 'dark'
  | 'light'
  | 'contrast'

export interface ColoredElement {
  color?: OpenColor
}

export type OpenColor = Color | string

export type NamedColor = 'mt-red' | 'mt-green' | 'mt-blue' | 'mt-yellow'

export type Severity = 'error' | 'warning' | 'info' | 'success'

export type Variant = 'default' | 'contained' | 'outlined'

export type Urgency = 'polite' | 'assertive'
