import React, { useEffect, useCallback } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import Router from "./Router"
import {
  initializeFirebaseApp,
  checkIfLoggedIn,
  listenAuthState,
  setAuthPersistence,
} from "./libs/firebase"
import { authState, appReadyState } from "./states"

export default function App() {
  const [, setLoggedIn] = useRecoilState(authState)
  const setAppReadyState = useSetRecoilState(appReadyState)

  const initialize = useCallback(() => {
    ;(async function () {
      initializeFirebaseApp()
      await setAuthPersistence()
      const loggedIn = await checkIfLoggedIn()
      setLoggedIn(loggedIn)
      setAppReadyState(true)
    })()
  }, [])

  useEffect(() => {
    initialize()

    const stopListeningAuthState = listenAuthState(user => {
      const loggedIn = user != null && !user.isAnonymous
      setLoggedIn(loggedIn)
    })

    return () => {
      stopListeningAuthState()
    }
  }, [])

  return <Router />
}
