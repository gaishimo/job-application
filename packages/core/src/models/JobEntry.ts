import * as yup from "yup"
import * as firestore from "@google-cloud/firestore"
import { Job, JOB_DATA } from "./Job"
import { EntryStatus, ENTRY_STATUS_DATA } from "./EntryStatus"
import { DocumentSnapshot } from "../db"

export interface JobEntry {
  id?: string
  name: string
  email: string
  age: number
  jobId: Job["id"]
  reason: string
  status: EntryStatus["id"]
  memo?: string | null
  entriedAt?: Date
  updatedAt?: Date
}
interface _JobEntry extends JobEntry {
  entriedAt: any
  updatedAt: any
}
interface FetchedJobEntry extends _JobEntry {
  entriedAt: firestore.Timestamp
  updatedAt: firestore.Timestamp
}

const schema = yup.object().shape({
  name: yup.string().required().max(50),
  email: yup.string().required().email().max(255),
  age: yup.number().required().min(1).max(100),
  jobId: yup
    .string()
    .required()
    .oneOf(JOB_DATA.map(d => d.id)),
  reason: yup.string().required().max(3000),
  status: yup
    .string()
    .required()
    .oneOf(ENTRY_STATUS_DATA.map(d => d.id)),
  memo: yup.string().nullable().max(3000),
  entriedAt: yup.date(),
  updatedAt: yup.date(),
})

export async function validateJobEntry(jobEntry: JobEntry): Promise<void> {
  await schema.validate(jobEntry)
}

export function generateJobEntryFromDB(snapshot: DocumentSnapshot) {
  if (!snapshot.exists) throw new Error("no document")
  const data = snapshot.data() as FetchedJobEntry
  if (data == null) throw new Error("empty data")
  return {
    id: snapshot.id,
    name: data.name,
    email: data.email,
    age: data.age,
    jobId: data.jobId,
    reason: data.reason,
    status: data.status,
    memo: data.memo,
    entriedAt: data.entriedAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  }
}
