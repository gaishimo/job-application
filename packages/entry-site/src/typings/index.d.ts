declare module "yup"

declare namespace Api {
  namespace AddJobEntry {
    export type RequestBody = {
      name: string
      email: string
      age: number
      job: string
      reason: string
    }
  }
}
