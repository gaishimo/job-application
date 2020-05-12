export type Job = {
  id: string
  name: string
}

export const JOB_DATA: Job[] = [
  { id: "clearicalPosition", name: "事務職" },
  { id: "enginner", name: "エンジニア" },
  { id: "designer", name: "デザイナー" },
]

export function getJobName(id: string) {
  const job = JOB_DATA.find(d => d.id === id)
  return job ? job.name : ""
}
