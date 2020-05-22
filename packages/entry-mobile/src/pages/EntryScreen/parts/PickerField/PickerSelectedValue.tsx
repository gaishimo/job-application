import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { FontSizes, Colors } from "../../../../values"

type Props = {
  onPress: () => void
  valueText: string
}

export default function PickerSelectedValue(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.row}>
        <Text style={styles.valueText}>{props.valueText}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  row: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "white",
    alignItems: "center",
    height: 46,
    justifyContent: "center",
  },
  valueText: {
    color: Colors.text1,
    fontSize: FontSizes.L,
    textAlign: "center",
  },
})
