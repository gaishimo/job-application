import * as firebase from "firebase/app"
import Constants from "../Constants"

export function initializeFirebaseApp() {
  const config = {
    apiKey: Constants.FIREBASE_API_KEY,
    authDomain: Constants.FIREBASE_AUTH_DOMAIN,
    databaseURL: Constants.FIREBASE_DATABASE_URL,
    projectId: Constants.FIREBASE_PROJECT_ID,
    appId: Constants.FIREBASE_APP_ID,
  }
  firebase.initializeApp(config)
}
