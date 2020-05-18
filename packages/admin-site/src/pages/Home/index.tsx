/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { CSVLink } from "react-csv"
import { ClipLoader } from "react-spinners"
import { JobEntry } from "@etco-job-application/core"
import ListItem from "./ListItem"
import Layout from "../../Layout"
import { SearchBox, TextButton } from "../../parts"
import { fetchJobEntries, loadAllJobEntries } from "../../libs/logics"
import { useQuery } from "../../libs/hooks"
import { formatDate } from "../../utils/date"

const RECORD_PER_PAGE = 20

// const header = [
//   "id",
//   "no",
//   "name",
//   "email",
//   "age",
//   "jobId",
//   "reason",
//   "status",
//   "memo",
//   "entriedAt",
//   "updatedAt",
// ]

const CSV_HEADERS = [
  { label: "No.", key: "no" },
  { label: "ID", key: "id" },
  { label: "名前", key: "name" },
  { label: "メールアドレス", key: "email" },
  { label: "年齢", key: "age" },
  { label: "職種", key: "jobId" },
  { label: "理由", key: "reason" },
  { label: "ステータス", key: "status" },
  { label: "メモ", key: "memo" },
  { label: "エントリー日時", key: "entriedAt" },
  { label: "最終更新日時", key: "updatedAt" },
]

export default function HomePage() {
  const history = useHistory()
  const query = useQuery()
  const [searchText, setSearchText] = useState<string>("")
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [entries, setEntries] = useState<JobEntry[] | null>(null)
  const [endReached, setEndReached] = useState<boolean>(false)
  const [csvDownloadStatus, setCsvDownloadStatus] = useState<
    "notReady" | "downloading" | "ready"
  >("notReady")
  const [csvData, setCsvData] = useState<object[] | null>(null)

  const entriesNum = (entries || []).length
  const isInLastPage = Math.ceil(entriesNum / RECORD_PER_PAGE) - 1 === pageIndex

  const start = RECORD_PER_PAGE * pageIndex
  const end = start + RECORD_PER_PAGE
  const nextable = !endReached || !isInLastPage

  async function load(
    startAfterDocId: string | null = null,
    searchText: string = "",
  ) {
    const { records, moreRecordsExist } = await fetchJobEntries(
      RECORD_PER_PAGE,
      startAfterDocId,
      searchText,
    )
    if (startAfterDocId) {
      setEntries([...(entries || []), ...records])
    } else {
      setEntries(records)
    }

    if (!moreRecordsExist) {
      setEndReached(true)
    }

    return moreRecordsExist
  }

  async function searchByText(text: string) {
    history.push(`/?query=${text}`)
    setSearchText(text)
    setEndReached(false)
    load(null, text)
  }

  async function nextPage() {
    const records = entries || []
    if (records.length < RECORD_PER_PAGE) return

    if (records.length > end) {
      setPageIndex(pageIndex + 1)
      return
    }

    const lastDoc = records[records.length - 1]
    await load(lastDoc.id, searchText)
    setPageIndex(pageIndex + 1)
  }

  function prevPage() {
    if (pageIndex === 0) return
    setPageIndex(pageIndex - 1)
  }

  async function prepareCsv() {
    setCsvDownloadStatus("downloading")
    const jobEntries = await loadAllJobEntries()
    setCsvData(
      jobEntries.map(entry => ({
        ...entry,
        entriedAt: formatDate(entry.entriedAt, "yyyy/MM/dd hh:mm:ss"),
        updatedAt: formatDate(entry.updatedAt, "yyyy/MM/dd hh:mm:ss"),
      })),
    )
    setCsvDownloadStatus("ready")
  }

  useEffect(() => {
    load(null, query.get("query") || "")
  }, [])

  return (
    <Layout title="応募一覧" containerWidth={900} showLogoutButton>
      <div css={styles.container}>
        <div css={styles.search}>
          <SearchBox
            initialValue={query.get("query") || ""}
            onSearch={searchByText}
          />
        </div>
        <div css={styles.view}>
          {entries === null && <div>loading...</div>}
          {entries && entries.length === 0 && (
            <div css={styles.noRecord}>
              {searchText.length > 0
                ? "応募が存在しません。"
                : "まだ応募がありません。"}
            </div>
          )}
          {entriesNum > 0 && (
            <div css={styles.data}>
              <div css={styles.dataHeader}>
                {csvDownloadStatus === "notReady" && (
                  <TextButton
                    styles={[styles.textButton]}
                    title="CSVダウンロード"
                    onClick={prepareCsv}
                  />
                )}
                {csvDownloadStatus === "downloading" && (
                  <div css={styles.downloading}>
                    <ClipLoader size={20} color={"#007AFF"} />
                  </div>
                )}
                {csvDownloadStatus === "ready" && (
                  <CSVLink
                    filename="job-entries.csv"
                    headers={CSV_HEADERS}
                    data={csvData || []}
                    css={styles.csvLink}
                    onClick={() => {
                      setTimeout(() => {
                        setCsvDownloadStatus("notReady")
                      }, 1000)
                    }}
                  >
                    ダウンロード準備完了
                  </CSVLink>
                )}
              </div>
              {(entries || []).slice(start, end).map((entry, i) => (
                <ListItem
                  key={i}
                  entry={entry}
                  onSelect={() => history.push(`/job-entries/${entry.id}`)}
                />
              ))}
              <div css={styles.dataFooter}>
                {pageIndex > 0 ? (
                  <TextButton
                    styles={[styles.textButton, styles.navTextButton]}
                    title="<戻る"
                    onClick={prevPage}
                  />
                ) : (
                  <div />
                )}
                {nextable ? (
                  <TextButton
                    styles={[styles.textButton, styles.navTextButton]}
                    title="次へ>"
                    onClick={nextPage}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

const styles = {
  container: css({}),
  search: css({
    display: "flex",
    justifyContent: "center",
  }),
  view: css({
    textAlign: "center",
    marginTop: 60,
  }),
  noRecord: css({
    marginTop: 80,
    textAlign: "center",
    fontSize: "1rem",
  }),
  data: css({
    paddingBottom: 50,
  }),
  dataHeader: css({
    minHeight: 30,
    padding: "6px 0",
    display: "flex",
    justifyContent: "flex-end",
  }),
  downloading: css({
    paddingRight: 30,
  }),
  csvLink: css({
    color: "#137cee",
  }),
  dataFooter: css({
    padding: "6px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  textButton: css({
    fontSize: "0.9rem",
  }),
  navTextButton: css({
    letterSpacing: "0.05rem",
  }),
}
