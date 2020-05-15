import admin from "firebase-admin"

export function getFirebaseAdminApp() {
  try {
    admin.initializeApp()
  } catch (e) {}
  return admin
}
