import { useState } from "react"
import { useLocation } from "react-router-dom"

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

export function useQuery() {
  return new URLSearchParams(useLocation().search)
}
