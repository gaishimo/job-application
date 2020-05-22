import React from "react"
import { Text, StyleSheet, View, TouchableWithoutFeedback } from "react-native"
import { Colors, FontSizes } from "../../../values"

type Props = {
  label: string
  on: boolean
  onPress: () => void
}

export default function CheckBox(props: Props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.button}>
        <View
          style={[styles.check, props.on ? styles.checkOn : styles.checkOff]}
        />
        <Text style={[styles.labelText, props.on && styles.labelTextOn]}>
          {props.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  check: {
    borderWidth: 1.5,
    width: 16,
    height: 16,
    marginRight: 6,
  },
  checkOn: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  checkOff: {
    borderColor: "#646464",
    backgroundColor: "transparent",
  },
  labelText: {
    fontSize: FontSizes.M,
    color: "#4A4A4A",
  },
  labelTextOn: {
    fontWeight: "bold",
  },
})
