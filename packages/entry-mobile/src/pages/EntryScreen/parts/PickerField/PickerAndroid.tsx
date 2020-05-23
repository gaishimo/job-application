import React, { useRef } from "react"
import {
  StyleSheet,
  Picker as RnPicker,
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  useWindowDimensions,
} from "react-native"
import { FontSizes, Colors } from "../../../../values"
import { FlatList } from "react-native-gesture-handler"

type Props = {
  selectedValue: string
  options: { value: string; label: string }[]
  onValueChange: (v: string) => void
}

export default function Picker(props: Props) {
  const ref = useRef(null)
  return (
    <View style={styles.wrapper}>
      <RnPicker
        ref={ref}
        selectedValue={props.selectedValue}
        mode="dropdown"
        onValueChange={value => {
          props.onValueChange(value)
        }}
      >
        <RnPicker.Item key={0} value={""} label={"選択してください"} />
        {props.options.map(({ value, label }) => (
          <RnPicker.Item key={value} value={value} label={label} />
        ))}
      </RnPicker>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  itemText: {},
})
