import React, { useEffect, useState, useCallback } from "react"
import { useRecoilState } from "recoil"
import Router from "./Router"
import {
  initializeFirebaseApp,
  checkIfLoggedIn,
  listenAuthState,
  setAuthPersistence,
} from "./libs/firebase"
import { authState } from "./states"

export default function App() {
  const [, setLoggedIn] = useRecoilState(authState)
  const [ready, setReady] = useState<boolean>(false)

  const initialize = useCallback(() => {
    ;(async function () {
      initializeFirebaseApp()
      await setAuthPersistence()
      const loggedIn = await checkIfLoggedIn()
      setLoggedIn(loggedIn)
      setReady(true)
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

  if (!ready) return null

  return <Router />
}
