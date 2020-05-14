import express from "express"
import cors from "cors"
import { ENTRY_STATUS_IDS, validateJobEntry } from "@etco-job-application/core"
import { getFirebaseAdminApp } from "../../libs/firebase"
import { getSendGridClient } from "../../libs/sendGrid"
import { getConfigs } from "../../libs/configs"
import {
  JobEntry,
  getJobName,
  generateJobEntryFromDB,
} from "@etco-job-application/core"

const JOB_ENTRY_COLLECTION_NAME = "jobEntries"

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
  const newDoc = admin.firestore().collection(JOB_ENTRY_COLLECTION_NAME).doc()

  try {
    await newDoc.set(jobEntry)
    console.log("new entry record saved.")
  } catch (e) {
    res.status(500).send({ error: e.message })
    return
  }

  const addedJobEntry = await generateJobEntryFromDB(await newDoc.get())
  console.log(JSON.stringify(addedJobEntry))
  try {
    await sendMailToAdmin(addedJobEntry)
  } catch (e) {
    res.status(500).send({ error: e.message })
    return
  }

  try {
    await sendMailToApplicant(addedJobEntry)
  } catch (e) {
    console.log(JSON.stringify(e))
    // 応募者へのメールは万が一失敗しても許容する
    // 管理者に届いていれば連絡は取れるため
  }

  res.status(200).send("ok")
})

async function sendMailToAdmin(jobEntry: JobEntry) {
  console.log("sendMailToAdmin()")
  const client = getSendGridClient()
  const configs = getConfigs()
  const msg = {
    from: configs.notification_mail.from,
    to: configs.notification_mail.to,
    subject: "新しい求人エントリーがありました",
    replyTo: configs.notification_mail.from,
    text: mailBodyForAdmin(jobEntry),
  }
  console.log("sending mail to admin")
  console.log(JSON.stringify(msg))
  await client.send(msg)
}

async function sendMailToApplicant(jobEntry: JobEntry) {
  console.log("sendMailToApplicant()")
  const client = getSendGridClient()
  const configs = getConfigs()
  const msg = {
    from: configs.notification_mail.from,
    to: jobEntry.email,
    subject: "◯◯社: 求人応募を受け付けました",
    replyTo: configs.notification_mail.from,
    text: mailBodyForApplicant(jobEntry),
  }
  console.log("sending mail to applicant")
  console.log(JSON.stringify(msg))
  await client.send(msg)
}

function mailBodyForApplicant(jobEntry: JobEntry) {
  return [
    `${jobEntry.name} 様`,
    "",
    "お世話になっております。",
    "",
    "この度は◯◯社の求人に応募頂きましてありがとうございました。",
    "後日担当よりご連絡させていただきます。",
    "",
    "",
    "-------------------------------------------",
    `氏名: ${jobEntry.name}`,
    `メールアドレス: ${jobEntry.email}`,
    `希望職種: ${getJobName(jobEntry.jobId)}`,
    `年齢: ${jobEntry.age}`,
    "希望理由:",
    jobEntry.reason,
    "-------------------------------------------",
    "",
  ].join("\n")
}

function mailBodyForAdmin(jobEntry: JobEntry) {
  return [
    "",
    "-------------------------------------------",
    `氏名: ${jobEntry.name}`,
    `メールアドレス: ${jobEntry.email}`,
    `希望職種: ${getJobName(jobEntry.jobId)}`,
    `年齢: ${jobEntry.age}`,
    "希望理由:",
    jobEntry.reason,
    "-------------------------------------------",
    "",
    "",
    "よろしくお願い致します。",
    "",
    "◯◯社人事部",
  ].join("\n")
}

export default app
