import { config } from "firebase-functions"

type Configs = {
  sendgrid: {
    api_key: string
  }
}

type SendgridConfig = {
  api_key: string
}

export function getConfigs() {
  return config() as Configs
}
