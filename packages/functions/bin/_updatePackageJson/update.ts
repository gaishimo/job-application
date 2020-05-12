import * as fs from "fs"
const data = require("../../package.temp.json")

const output = {
  ...data,
  dependencies: {
    ...data.dependencies,
    "@etco-job-application/core": "file:core",
  },
}
fs.writeFileSync("./package.json", JSON.stringify(output, null, 2))
console.log("replace package.json", output)
