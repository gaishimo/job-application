/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { TextButton } from "./parts"

type Props = {
  title: string
  showBackButton?: boolean
  showLogoutButton?: boolean
}

const styles = {
  container: css({
    marginLeft: "auto",
    marginRight: "auto",
    width: 900,
  }),
  header: css({
    paddingTop: 12,
    paddingBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    minHeight: 30,
  }),
  title: css({
    marginTop: 16,
    textAlign: "center",
  }),
}

export default function Layout(props: Props) {
  return (
    <div css={styles.container}>
      <header css={styles.header}>
        {props.showBackButton ? <TextButton title="< 戻る" /> : <div />}
        {props.showLogoutButton ? <TextButton title="ログアウト" /> : <div />}
      </header>
      <h1 css={styles.title}>{props.title}</h1>
    </div>
  )
}
