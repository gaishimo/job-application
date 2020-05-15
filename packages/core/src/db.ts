import { firestore } from "firebase"
import "@google-cloud/firestore"

export type DocumentSnapshot =
  | firestore.DocumentSnapshot
  | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
