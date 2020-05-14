import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Auth from "./Auth"
import * as Pages from "../pages"

type Props = {
  user: firebase.User | null
}

export default function Router(props: Props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Pages.Login />
        </Route>

        <Auth loggedIn={props.user != null}>
          <Route exact path="/">
            <Pages.Home />
          </Route>
          <Route exact path="/job-entries/:id">
            <Pages.JobEntry />
          </Route>
        </Auth>
        <Route>
          <Pages.NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
