/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { JobEntry, getJobName, getStatusName } from "@etco-job-application/core"
import { formatDate } from "../../utils/date"

type Props = {
  entry: JobEntry
  onSelect: () => void
}

export default function ListItem(props: Props) {
  const entry = props.entry
  return (
    <li css={styles.listItem}>
      <div css={[styles.field, css({ textAlign: "right" })]}>{entry.no}</div>
      <div css={[styles.field, css({ minWidth: 80 })]}>{entry.name}</div>
      <div css={[styles.field, css({ minWidth: 80 })]}>{entry.email}</div>
      <div css={[styles.field, css({ minWidth: 70 })]}>
        {getJobName(entry.jobId)}
      </div>
      <div css={[styles.field, css({ minWidth: 70 })]}>
        {getStatusName(entry.status)}
      </div>
      <div css={styles.field}>{entry.age}歳</div>
      <div css={styles.field}>
        {entry.entriedAt ? formatDate(entry.entriedAt, "yyyy年MM月dd日") : ""}
      </div>
    </li>
  )
}

const styles = {
  listItem: css({
    minWidth: 40,
    marginBottom: 8,
    border: "1px solid #D8D8D8",
    borderRadius: 4,
    padding: "18px 16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F8F8FC",
    },
  }),
  field: css({
    fontSize: "0.9rem",
    padding: "0 8px",
  }),
}
