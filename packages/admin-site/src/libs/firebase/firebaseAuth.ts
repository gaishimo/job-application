import * as firebase from "firebase"

export async function setAuthPersistence() {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
}

export async function checkIfLoggedIn() {
  const user = await getCurrentUser()
  return user != null && !user.isAnonymous
}

export async function mustGetCurrentUser(): Promise<firebase.User> {
  const user = await getCurrentUser()
  if (user == null) {
    throw new Error("not_logged_in")
  }
  return user
}

export async function getCurrentUser(): Promise<firebase.User | null> {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      resolve(null)
    }, 1000)
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

export async function signInWithEmail(email: string, password: string) {
  await firebase.auth().signInWithEmailAndPassword(email, password)
}

export async function signOut() {
  const user = await getCurrentUser()
  if (user == null) return
  await firebase.auth().signOut()
}
