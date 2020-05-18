import React, { useEffect, useState, useCallback } from "react"
import {
  useDispatch,
  Provider as ReduxProvider,
  useSelector,
} from "react-redux"
import Router from "./Router"
import {
  initializeFirebaseApp,
  checkIfLoggedIn,
  listenAuthState,
  setAuthPersistence,
} from "./libs/firebase"
import { actions as authActions } from "./reduxModules/auth"
import store from "./store"

export default function App() {
  const dispatch = useDispatch()
  const [ready, setReady] = useState<boolean>(false)

  const initialize = useCallback(() => {
    ;(async function () {
      initializeFirebaseApp()
      await setAuthPersistence()
      const loggedIn = await checkIfLoggedIn()
      dispatch(authActions.setLoggedIn(loggedIn))
      setReady(true)
    })()
  }, [dispatch])

  useEffect(() => {
    initialize()

    const stopListeningAuthState = listenAuthState(user => {
      const loggedIn = user != null && !user.isAnonymous
      dispatch(authActions.setLoggedIn(loggedIn))
    })

    return () => {
      stopListeningAuthState()
    }
  }, [])

  if (!ready) return null

  return (
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  )
}
