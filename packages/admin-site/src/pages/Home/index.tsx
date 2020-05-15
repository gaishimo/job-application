/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import React, { useEffect, useState } from "react"
import { JobEntry } from "@etco-job-application/core"
import ListItem from "./ListItem"
import Layout from "../../Layout"
import { SearchBox, TextButton } from "../../parts"
import { fetchJobEntries } from "../../libs/logics"

const RECORD_PER_PAGE = 5

export default function HomePage() {
  const [searchText, setSearchText] = useState<string>("")
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [entries, setEntries] = useState<JobEntry[] | null>(null)
  const [endReached, setEndReached] = useState<boolean>(false)

  const entriesNum = (entries || []).length
  const isInLastPage = Math.ceil(entriesNum / RECORD_PER_PAGE) - 1 === pageIndex
  console.log("isInLastPage:", isInLastPage)
  console.log("endReached:", endReached)

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

  useEffect(() => {
    load()
  }, [])

  return (
    <Layout title="応募一覧" containerWidth={900} showLogoutButton>
      <div css={styles.container}>
        <div css={styles.search}>
          <SearchBox onSearch={searchByText} />
        </div>
        <div css={styles.view}>
          {entries === null && <div>loading...</div>}
          {entries && entries.length === 0 && (
            <div css={styles.noRecord}>まだ応募がありません。</div>
          )}
          {entriesNum > 0 && (
            <div css={styles.data}>
              <div css={styles.dataHeader}>
                <TextButton
                  styles={[styles.textButton]}
                  title="CSVダウンロード"
                  onClick={() => {}}
                />
              </div>
              {(entries || []).slice(start, end).map((entry, i) => (
                <ListItem key={i} entry={entry} onSelect={() => {}} />
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
  }),
  data: css({}),
  dataHeader: css({
    padding: "6px 0",
    display: "flex",
    justifyContent: "flex-end",
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
