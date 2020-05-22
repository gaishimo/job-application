import * as React from "react"
import { StyleSheet, Text } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { FontSizes, Colors } from "../../../values"

type Props = {
  title: string
  onPress: () => void
}

export default function TextButton(props: Props) {
  return (
    <BorderlessButton style={[styles.button]} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </BorderlessButton>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: FontSizes.L,
    textAlign: "center",
  },
})
