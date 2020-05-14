import React, { useEffect, useState, useCallback } from "react"
import { useDispatch, Provider as ReduxProvider } from "react-redux"
import Router from "./Router"
import { initializeFirebaseApp, checkIfLoggedIn } from "./libs/firebase"
import { actions as authActions } from "./reduxModules/auth"
import store from "./store"

export default function App() {
  const dispatch = useDispatch()
  const [ready, setReady] = useState<boolean>(false)

  const initialize = useCallback(() => {
    ;(async function () {
      initializeFirebaseApp()
      const loggedIn = await checkIfLoggedIn()
      dispatch(authActions.setLoggedIn(loggedIn))
      setReady(true)
    })()
  }, [dispatch])

  useEffect(() => {
    initialize()
  }, [initialize])

  if (!ready) return null

  return (
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  )
}
