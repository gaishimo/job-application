import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import * as Pages from "./pages"

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Pages.Login />
        </Route>
        <Route exact path="/">
          <Pages.Home />
        </Route>
        <Route exact path="/job-entries/:id">
          <Pages.JobEntry />
        </Route>
        <Route>
          <Pages.NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
