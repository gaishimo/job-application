import { atom } from "recoil"

export const authState = atom({
  key: "authState",
  default: false,
})

export const appReadyState = atom({
  key: "appReadyState",
  default: false,
})
