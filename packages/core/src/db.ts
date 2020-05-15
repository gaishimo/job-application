import { firestore } from "firebase"

export type DocumentSnapshot =
  | firestore.DocumentSnapshot
  | FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
