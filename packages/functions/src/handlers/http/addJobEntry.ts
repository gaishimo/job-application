import express from "express"
import cors from "cors"
import { ENTRY_STATUS_IDS, validateJobEntry } from "@etco-job-application/core"
import { getFirebaseAdminApp } from "../../libs/firebase"

const app = express()

app.use(cors())
app.use(express.json())

app.post("/", async (req, res) => {
  console.log(JSON.stringify(req.body))

  const body = req.body as Api.AddJobEntry.RequestBody

  const jobEntry = {
    name: body.name,
    email: body.email,
    age: body.age,
    jobId: body.jobId,
    reason: body.reason,
    status: ENTRY_STATUS_IDS.waiting,
    memo: null,
    entriedAt: new Date(),
    updatedAt: new Date(),
  }
  console.log(JSON.stringify(jobEntry))
  try {
    await validateJobEntry(jobEntry)
  } catch (e) {
    console.log(JSON.stringify(e.errors))
    res.status(400).send({ error: JSON.stringify(e.errors) })
    return
  }

  const admin = getFirebaseAdminApp()
  const newDoc = admin.firestore().collection("entries").doc()

  try {
    await newDoc.set(jobEntry)
  } catch (e) {
    res.status(500).send({ error: e.message })
    return
  }
  res.status(200).send("ok")
})

export default app
