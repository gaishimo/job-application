import React from "react"
import { StyleSheet, View } from "react-native"
import EntryScreen from "./src/pages/EntryScreen"

export default function App() {
  return (
    <View style={styles.container}>
      <EntryScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FC",
  },
})
