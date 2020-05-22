import React from "react"
import FieldPicker from "./FieldPicker"
import PickerSelectedValue from "./PickerSelectedValue"
import { range } from "../../../../utils/numberUtils"

type Props = {
  selecting: boolean
  selectedLabel: string
  selectedValue: string
  options: { value: string; label: string }[]
  onPressSelectedValue: () => void
  onValueChange: (v: string) => void
}

export default function PickerField(props: Props) {
  return (
    <>
      {!props.selecting && (
        <PickerSelectedValue
          valueText={props.selectedLabel}
          onPress={props.onPressSelectedValue}
        />
      )}
      {props.selecting && (
        <FieldPicker
          selectedValue={props.selectedValue}
          options={props.options}
          onValueChange={props.onValueChange}
        />
      )}
    </>
  )
}
