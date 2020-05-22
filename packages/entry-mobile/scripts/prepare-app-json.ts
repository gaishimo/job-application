import * as fs from "fs"
const template = require("../app.template.json")

const output = {
  expo: {
    ...template.expo,
    extra: {
      apiUrls: {
        addJobEntry: process.env.npm_config_api_url_add_job_entry,
      },
    },
  },
}
fs.writeFileSync("./app.json", JSON.stringify(output, null, 2))
