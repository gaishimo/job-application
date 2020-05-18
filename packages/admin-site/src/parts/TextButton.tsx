/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { SerializedStyles } from "@emotion/serialize"
import { Colors } from "../values"

type Props = {
  title: string
  styles?: (SerializedStyles | undefined)[]
  onClick?: () => void
}

export default function TextButton(props: Props) {
  return (
    <button
      css={[styles.button, ...(props.styles || [])]}
      onClick={props.onClick}
    >
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
    color: Colors.moderateBlue,
    fontSize: "0.9rem",
    "&:hover": {
      fontWeight: "bold",
    },
    "&:focus": {
      transform: "translateY(1px) scale(0.98)",
    },
  }),
}
