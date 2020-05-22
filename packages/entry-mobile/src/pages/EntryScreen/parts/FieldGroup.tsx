import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { FontSizes, Colors } from "../../../values"

type Props = {
  label: string
  focusing?: boolean
  error?: string | null
  children: React.ReactNode
}

export default function FieldGroup(props: Props) {
  return (
    <View style={styles.group}>
      <View style={styles.label}>
        <Text
          style={[
            styles.labelText,
            props.error ? styles.errorText : null,
            props.focusing && styles.labelTextFocused,
          ]}
        >
          {props.label}
        </Text>
        <Text style={styles.labelTextFocused && styles.requiredMark}>*</Text>
      </View>
      <View>{props.children}</View>
      <View style={styles.error}>
        <Text style={styles.errorText}>{props.error || ""}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  group: {},
  label: {
    paddingLeft: 12,
    paddingVertical: 4,
    flexDirection: "row",
  },
  labelText: {
    color: Colors.text1,
    fontSize: FontSizes.M,
  },
  labelTextFocused: {
    fontWeight: "bold",
  },
  requiredMark: {
    marginLeft: 4,
    top: -4,
    color: "red",
    fontSize: FontSizes.L,
  },
  error: {
    paddingTop: 10,
    paddingLeft: 12,
    minHeight: 46,
  },
  errorText: {
    color: Colors.danger,
  },
})
