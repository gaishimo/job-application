/** @jsx jsx */
import { css, jsx } from "@emotion/core"

type Props = {
  title: string
  onClick?: () => void
}

export default function TextButton(props: Props) {
  return (
    <button css={styles.button} onClick={props.onClick}>
      {props.title}
    </button>
  )
}

const styles = {
  button: css({
    border: "none",
    cursor: "pointer",
    padding: "6px 10px",
    backgroundColor: "transparent",
    color: "#3883C0",
    fontSize: "1rem",
    "&:hover": {
      fontWeight: "bold",
    },
    "&:focus": {
      transform: "translateY(1px) scale(0.98)",
    },
  }),
}
