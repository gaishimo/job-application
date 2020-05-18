import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useRecoilValue } from "recoil"
import LoggedIn from "./LoggedIn"
import * as Pages from "../pages"
import { authState, appReadyState } from "../states"

export default function Router() {
  const appReady = useRecoilValue(appReadyState)
  const loggedIn = useRecoilValue(authState)

  if (!appReady) return null
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          {loggedIn ? <Redirect to="/" /> : <Pages.Login />}
        </Route>
        <LoggedIn loggedIn={loggedIn}>
          <Route exact path="/">
            <Pages.Home />
          </Route>
          <Route exact path="/job-entries/:id">
            <Pages.JobEntry />
          </Route>
        </LoggedIn>
        <Route>
          <Pages.NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
