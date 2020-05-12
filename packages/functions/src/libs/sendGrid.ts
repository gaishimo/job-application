import sgMail from "@sendgrid/mail"
import { getConfigs } from "./configs"

export function getSendGridClient() {
  const configs = getConfigs()
  sgMail.setApiKey(configs.sendgrid.api_key)
  return sgMail
}
