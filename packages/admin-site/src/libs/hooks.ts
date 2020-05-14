import { useState } from "react"

export function useControlledInput(defaultValue: string) {
  const [value, setValue] = useState(defaultValue)
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }
  return { value, onChange }
}

export function useControlledTextarea(defaultValue: string) {
  const [value, setValue] = useState(defaultValue)
  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value)
  }
  return { value, onChange }
}
