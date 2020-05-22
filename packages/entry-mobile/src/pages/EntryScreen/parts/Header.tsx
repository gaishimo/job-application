import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { FontSizes, Colors } from "../../../values"

type Props = {
  title: string
}

export default function Header(props: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.text1,
    fontWeight: "bold",
    fontSize: FontSizes.LL,
  },
})
