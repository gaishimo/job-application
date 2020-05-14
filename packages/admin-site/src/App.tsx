import React, { useEffect, useState } from "react"
import Router from "./Router"
import {
  initializeFirebaseApp,
  getCurrentUser,
  listenAuthState,
} from "./libs/firebase"

export default function App() {
  const [ready, setReady] = useState<boolean>(false)
  const [user, setUser] = useState<firebase.User | null>(null)

  async function initialize() {
    initializeFirebaseApp()
    const currentUser = await getCurrentUser()
    console.log("currentUser:", currentUser)
    setUser(currentUser)

    setReady(true)
  }

  useEffect(() => {
    initialize()
    const unsubscribe = listenAuthState(user => {
      setUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  if (!ready) return null
  return <Router user={user} />
}
