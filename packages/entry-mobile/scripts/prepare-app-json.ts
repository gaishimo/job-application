import * as fs from "fs"
const template = require("../app.template.json")

// Embed environmental variables into app.json

const output = {
  expo: {
    ...template.expo,
    ios: {
      ...template.ios,
      bundleIdentifier: process.env.npm_config_ios_bundle_identifier,
      buildNumber: process.env.npm_config_ios_build_number,
    },
    android: {
      package: process.env.npm_config_android_package_name,
      versionCode: parseInt(
        process.env.npm_config_android_version_code || "1",
        10,
      ),
    },
    extra: {
      apiUrls: {
        addJobEntry: process.env.npm_config_api_url_add_job_entry,
      },
    },
  },
}
fs.writeFileSync("./app.json", JSON.stringify(output, null, 2))
