import * as React from 'react'
import { Checkbox, Radio, RadioGroup } from '.'
import { Container } from '../Container'
import { Form, useForm } from '../Form'
import { COLORS } from '../../const'
import { Button } from '../Button'

const FORM = {
  isDaddy: true,
  hasBoat: false,
}

export function CheckboxExample() {
  const { form, handleChange } = useForm(FORM)

  return (
    <Form>
      <Container row>
        <Checkbox
          name="isDaddy"
          checked={form.data.isDaddy}
          onChange={handleChange}
        >
          I'm a daddy
        </Checkbox>
        <Checkbox
          name="hasBoat"
          checked={form.data.hasBoat}
          onChange={handleChange}
        >
          I have a boat
        </Checkbox>
      </Container>
      <pre>
        <code>{JSON.stringify(form.data, null, 2)}</code>
      </pre>
    </Form>
  )
}

export function CheckboxSizesExample() {
  const { form, handleChange } = useForm({
    small: false,
    default: false,
    large: false,
    px: false,
  })

  return (
    <Container row center>
      <Checkbox
        name="small"
        size="small"
        checked={form.data.small}
        onChange={handleChange}
      >
        Small
      </Checkbox>
      <Checkbox
        name="default"
        checked={form.data.default}
        onChange={handleChange}
      >
        Default
      </Checkbox>
      <Checkbox
        name="large"
        size="large"
        checked={form.data.large}
        onChange={handleChange}
      >
        Large
      </Checkbox>
      <Checkbox
        name="px"
        size={50}
        checked={form.data.px}
        onChange={handleChange}
      >
        50 pixels
      </Checkbox>
    </Container>
  )
}

export function CheckboxColorsExample() {
  const checkboxColors = COLORS.filter(c => c !== 'dark' && c !== 'light')
  const formInitial: Record<string, boolean> = COLORS.reduce(
    (colors, color) => ({ ...colors, [color]: false }),
    {}
  )
  const { form, handleChange } = useForm(formInitial)

  return (
    <Container row>
      {checkboxColors.map(color => (
        <Checkbox
          name={color}
          key={color}
          checked={form.data[color]}
          color={color}
          onChange={handleChange}
        >
          {color}
        </Checkbox>
      ))}
    </Container>
  )
}

export function CheckboxIndeterminateExample() {
  const [state, setState] = React.useState<boolean | null>(null)

  return (
    <Container row>
      <Checkbox
        name="indeterminate"
        checked={!!state}
        indeterminate={state === null}
        onChange={(_, checked) => setState(checked)}
      >
        Indeterminate
      </Checkbox>
      <Button
        variant="contained"
        disabled={state === null}
        onClick={() => setState(null)}
      >
        Reset
      </Button>
    </Container>
  )
}

export function RadioExample() {
  const defaultChecked = 'ipsum'
  const [checked, setChecked] = React.useState(defaultChecked)

  return (
    <>
      <Container row>
        <RadioGroup
          name="radio1"
          defaultChecked={defaultChecked}
          onChange={setChecked}
        >
          <Radio value="lorem">Lorem</Radio>
          <Radio value="ipsum">Ipsum</Radio>
        </RadioGroup>
        <span>
          Checked: <b>{checked}</b>
        </span>
      </Container>
    </>
  )
}
