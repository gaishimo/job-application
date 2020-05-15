export type EntryStatus = {
  id: string
  name: string
}

export const ENTRY_STATUS_IDS: { [key: string]: string } = {
  waiting: "waiting",
  inProgress: "inProgress",
  done: "done",
}

export function getStatusName(id: string) {
  const names: { [key: string]: string } = {
    waiting: "受付中",
    inProgress: "選考中",
    done: "選考済み",
  }
  return names[id]
}

export const ENTRY_STATUS_DATA: EntryStatus[] = [
  { id: ENTRY_STATUS_IDS.waiting, name: "受付中" },
  { id: ENTRY_STATUS_IDS.inProgress, name: "選考中" },
  { id: ENTRY_STATUS_IDS.done, name: "選考済" },
]
