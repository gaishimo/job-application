import * as firebase from "firebase"

export async function getCurrentUser(): Promise<firebase.User | null> {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      resolve(null)
    }, 3000)
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      clearTimeout(timeout)
      unsubscribe()
      resolve(user)
    })
  })
}

export function listenAuthState(
  onChange: (user: firebase.User | null) => void,
): firebase.Unsubscribe {
  return firebase.auth().onAuthStateChanged(onChange)
}
