import * as firebase from "firebase/app"
import { JobEntry, generateJobEntryFromDB } from "@etco-job-application/core"

export async function fetchJobEntry(id: string) {
  const docRef = firebase.firestore().collection("jobEntries").doc(id)
  const snap = await docRef.get()
  if (!snap.exists) return null
  return generateJobEntryFromDB(snap)
}

export async function fetchJobEntries(
  limit: number,
  startAfterId: string | null,
  searchText: string = "",
): Promise<{ records: JobEntry[]; moreRecordsExist: boolean }> {
  const collectionRef = firebase.firestore().collection("jobEntries")
  const baseQuery =
    searchText.trim().length > 0
      ? collectionRef
          .orderBy("name", "asc")
          .startAt(searchText)
          .endAt(searchText + "\uf8ff")
      : collectionRef.orderBy("entriedAt", "desc")
  let searchQuery = baseQuery.limit(limit)
  if (startAfterId) {
    const startAfterDoc = await collectionRef.doc(startAfterId).get()
    searchQuery = searchQuery.startAfter(startAfterDoc)
  }
  const searchSnap = await searchQuery.get()
  const records: JobEntry[] = []
  let lastDoc = null
  searchSnap.forEach(doc => {
    const jobEntry = generateJobEntryFromDB(doc)
    records.push(jobEntry)
    lastDoc = doc
  })
  if (lastDoc == null) {
    return {
      records,
      moreRecordsExist: false,
    }
  }
  // 次のレコードが存在するかどうか確認しておく
  const additionalQuery = baseQuery.startAfter(lastDoc).limit(1)
  const additionalSnap = await additionalQuery.get()
  const moreRecordsExist = additionalSnap.docs.length > 0
  return {
    records,
    moreRecordsExist,
  }
}

type UpdateFields = Pick<
  JobEntry,
  "name" | "email" | "age" | "jobId" | "reason" | "status" | "memo"
>

export async function updateJobEntry(
  id: string,
  fields: UpdateFields,
  now: Date = new Date(),
) {
  const docRef = firebase.firestore().collection("jobEntries").doc(id)
  const updates: Partial<JobEntry> = {
    ...fields,
    updatedAt: now,
  }
  await docRef.update(updates)
}

export async function deleteJobEntry(id: string) {
  const docRef = firebase.firestore().collection("jobEntries").doc(id)
  await docRef.delete()
}
