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
