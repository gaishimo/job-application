import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import LoggedIn from "./LoggedIn"
import * as Pages from "../pages"
import { State } from "../store"

export default function Router() {
  const loggedIn = useSelector((state: State) => state.auth.loggedIn)

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
