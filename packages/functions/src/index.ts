import { region, config } from "firebase-functions"
import addJobEntry from "./handlers/http/addJobEntry"

const tokyoRegion = region("asia-northeast1")

exports.addJobEntry = tokyoRegion.https.onRequest(addJobEntry)
