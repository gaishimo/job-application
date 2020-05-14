/** @jsx jsx */
import { css, jsx } from "@emotion/core"

type Props = {
  label: string
  fieldId: string
  showRequiredMark?: false
  error?: string | null
  children: React.ReactNode
}

const styles = {
  group: css({
    width: "100%",
    marginBottom: 10,
  }),
  label: css({
    display: "block",
    marginBottom: 10,
  }),
  requiredMark: css({
    marginLeft: 4,
    color: "red",
    fontSize: "1.2rem",
  }),
  error: css({
    marginTop: 8,
    fontSize: "0.9rem",
    minHeight: 30,
    color: "red",
  }),
}

export default function FieldGroup(props: Props) {
  return (
    <div css={styles.group}>
      <label htmlFor={props.fieldId} css={styles.label}>
        {props.label}
        {props.showRequiredMark && <span css={styles.requiredMark}>*</span>}
      </label>
      <div>{props.children}</div>
      <div css={styles.error}>{props.error || ""}</div>
    </div>
  )
}
