import { config } from "firebase-functions"

type Configs = {
  sendgrid: {
    api_key: string
  }
  notification_mail: {
    from: string
    to: string
  }
}

type SendgridConfig = {
  api_key: string
}

export function getConfigs() {
  return config() as Configs
}
