import * as yup from "yup"
import { Job, JOB_DATA } from "./Job"
import { EntryStatus, ENTRY_STATUS_DATA } from "./EntryStatus"

export default interface JobEntry {
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
