import React from "react"
import { Platform, Picker as RnPicker } from "react-native"
import PickerIOS from "./PickerIOS"
import PickerAndroid from "./PickerAndroid"
import PickerSelectedValue from "./PickerSelectedValue"

type Props = {
  selecting: boolean
  selectedLabel: string
  selectedValue: string
  initialValueForIOS: string
  options: { value: string; label: string }[]
  onPressSelectedValue: () => void
  onValueChange: (v: string) => void
}

export default function PickerField(props: Props) {
  if (Platform.OS === "ios") {
    return (
      <>
        {!props.selecting ? (
          <PickerSelectedValue
            valueText={props.selectedLabel}
            onPress={props.onPressSelectedValue}
          />
        ) : (
          <PickerIOS
            selectedValue={
              props.selectedValue === ""
                ? props.initialValueForIOS
                : props.selectedValue
            }
            options={props.options}
            onValueChange={props.onValueChange}
          />
        )}
      </>
    )
  } else {
    return (
      <PickerAndroid
        selectedValue={props.selectedValue}
        options={props.options}
        onValueChange={props.onValueChange}
      />
    )
  }
}
