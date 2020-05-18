/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import HashLoader from "react-spinners/HashLoader"

export default function Loading() {
  return (
    <div css={styles.container}>
      <HashLoader css={styles.loader} size={50} color="#007AFF" />
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    justifyContent: "center",
    paddingTop: 200,
  }),
  loader: css({
    opacity: 0.7,
  }),
}
