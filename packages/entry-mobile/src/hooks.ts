import { useState } from "react"

export function useControlledInput(defaultValue: string) {
  const [value, setValue] = useState(defaultValue)
  function onChangeText(text: string) {
    setValue(text)
  }
  return { value, onChangeText }
}
