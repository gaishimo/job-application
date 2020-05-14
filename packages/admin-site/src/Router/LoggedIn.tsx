import React from "react"
import { Redirect } from "react-router-dom"

type Props = {
  loggedIn: boolean
  children: React.ReactNode
}

export default function LoggedInGroup(props: Props) {
  return props.loggedIn ? <>{props.children}</> : <Redirect to="/login" />
}
