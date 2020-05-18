/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { FormEvent } from "react"
import { IconContext } from "react-icons"
import { GoSearch } from "react-icons/go"
import { useControlledInput } from "../libs/hooks"

type Props = {
  initialValue: string
  onSearch: (text: string) => void
}

export default function SearchBox(props: Props) {
  const input = useControlledInput(props.initialValue)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.onSearch(input.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <div css={styles.box}>
        <input type="search" css={styles.input} {...input} />
        <IconContext.Provider value={{ color: "#787878", size: "1.2rem" }}>
          <GoSearch css={styles.icon} />
        </IconContext.Provider>
      </div>
    </form>
  )
}

const styles = {
  box: css({
    position: "relative",
  }),
  input: css({
    width: 360,
    height: 42,
    backgroundColor: "#FCFCFC",
    border: "1px solid #D8D8D8",
    borderRadius: 30,
    position: "relative",
    padding: "4px 20px 4px 40px",
    fontSize: "1rem",
    color: "#323232",
    letterSpacing: "0.1rem",
  }),
  icon: css({
    position: "absolute",
    left: 12,
    top: 12.5,
  }),
}
