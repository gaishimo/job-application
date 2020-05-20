/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { FormEvent } from "react"
import { IconContext } from "react-icons"
import { GoSearch } from "react-icons/go"
import { useControlledInput } from "../libs/hooks"
import { Colors } from "../values"

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
        <input
          type="search"
          css={styles.input}
          placeholder="名前検索"
          {...input}
        />
        <IconContext.Provider value={{ color: Colors.darkGrey, size: "20px" }}>
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
    backgroundColor: Colors.mostelyWhite,
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: 30,
    position: "relative",
    padding: "4px 20px 4px 40px",
    fontSize: "1rem",
    color: Colors.veryDarkGrey,
    letterSpacing: "0.1rem",
    appearance: "textfield",
    "::placeholder": {
      fontSize: "0.85rem",
      letterSpacing: 0.1,
    },
  }),
  icon: css({
    position: "absolute",
    left: 12,
    top: 12.5,
  }),
}
