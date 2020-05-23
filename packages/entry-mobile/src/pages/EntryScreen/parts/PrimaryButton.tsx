import * as React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { Colors, FontSizes } from "../../../values"

type Props = {
  title: string
  disabled?: boolean
  onPress: () => void
}

export default function PrimaryButton(props: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.disabled && styles.buttonDisabled]}
      onPress={props.disabled ? () => {} : props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#c8c8c8",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: FontSizes.M,
    textAlign: "center",
  },
})
