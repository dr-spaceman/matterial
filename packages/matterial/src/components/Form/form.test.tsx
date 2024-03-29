import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { FormChangeEvent } from '.'
import { render, screen } from '../../test-utils'
import { Form, FormGroup, TextInput } from '.'
import { FormExample } from './form.examples'

describe('useForm hook', () => {
  test('should render with a value and change the value on input', () => {
    render(<FormExample />)

    const inpEl = screen.getByLabelText('Feedback')
    const inputValue = 'Officia incididunt do officia eiusmod commodo.'
    expect(inpEl).toHaveValue(inputValue)
    userEvent.type(inpEl, 'bar')
    userEvent.tab() // trigger onBlur event thereby triggering onChange callback
    expect(inpEl).toHaveValue(inputValue + 'bar')
  })
})

test('should render a form and label with text input', () => {
  const label = 'foo'
  const { getByTestId, getByLabelText } = render(
    <Form data-testid="form">
      <FormGroup label={label} input={<input type="text" />} />
    </Form>
  )

  expect(getByTestId('form')).toBeInTheDocument()
  expect(getByLabelText(label)).toBeInTheDocument()
})

describe('text input', () => {
  test('should have the proper `type` attribute', () => {
    const { getByRole, getByPlaceholderText, rerender } = render(
      <TextInput name="text-input" />
    )

    expect(getByRole('textbox')).toHaveAttribute('type', 'text')

    const placeholder = 'My Number'
    rerender(
      <TextInput type="number" name="number-input" placeholder={placeholder} />
    )

    expect(getByPlaceholderText(placeholder)).toHaveAttribute('type', 'number')
  })

  test('should render a textarea when appropriate', () => {
    const placeholder = 'placeholder'
    const { container } = render(
      <TextInput
        name="multirow"
        multiline={true}
        rows={2}
        placeholder={placeholder}
      />
    )

    expect(container.querySelector('input')).not.toBeInTheDocument()
    expect(container.querySelector('textarea')).toHaveAttribute('rows', '2')
  })

  test('should render with a value and change the value on input', () => {
    const value = 'foo'
    let changedValue: Parameters<FormChangeEvent>[1] = ''
    const registerChange: FormChangeEvent = (_, newValue) => {
      changedValue = newValue
    }

    render(
      <FormGroup
        label="input"
        input={
          <TextInput name="input" value={value} onChange={registerChange} />
        }
      />
    )
    expect(screen.getByRole('textbox')).toHaveValue(value)
    userEvent.type(screen.getByRole('textbox'), 'bar')
    userEvent.tab() // trigger onBlur event thereby triggering onChange callback
    expect(screen.getByRole('textbox')).toHaveValue(changedValue)
  })
})

describe('form group', () => {
  test('should have helper text', () => {
    const note = 'foo'
    const label = 'bar'
    render(
      <FormGroup
        label={label}
        input={<TextInput name={label} />}
        helperText={note}
      />
    )

    expect(screen.getByRole('note')).toBeInTheDocument()
    expect(screen.getByLabelText(label)).toHaveAccessibleDescription(note)
  })

  test('should indicate error', () => {
    render(
      <FormGroup
        error
        helperText="error"
        label="error"
        input={<TextInput name="input" />}
      />
    )

    expect(screen.getByRole('textbox')).toBeInvalid()
    expect(screen.getByRole('note')).toHaveTextContent('error')
  })
})
