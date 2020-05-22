import axios from "axios"
import Constants from "./Constants"

export async function addJobEntry(fields: Api.AddJobEntry.RequestBody) {
  const data = {
    ...fields,
  }
  await axios({
    method: "POST",
    url: Constants.API_URL_ADD_JOB_ENTRY,
    data,
  })
}
