declare module "react-native-autogrow-textinput"
declare module "react-native-svg-animated-linear-gradient"
declare module "yup"

declare namespace Api {
  namespace AddJobEntry {
    export type RequestBody = {
      name: string
      email: string
      age: number
      jobId: string
      reason: string
    }
  }
}
