import React from "react"
import { Picker } from "react-native"

type Props = {
  selectedValue: string
  options: { value: string; label: string }[]
  onValueChange: (v: string) => void
}

export default function FieldPicker(props: Props) {
  return (
    <Picker
      selectedValue={props.selectedValue}
      onValueChange={props.onValueChange}
    >
      {props.options.map(({ value, label }) => (
        <Picker.Item key={value} value={value} label={label} />
      ))}
    </Picker>
  )
}
