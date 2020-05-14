/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { TextButton } from "./parts"

type Props = {
  title: string
  containerWidth?: number
  showBackButton?: boolean
  showLogoutButton?: boolean
  children?: React.ReactNode
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
  body: css({
    marginTop: 70,
  }),
}

export default function Layout(props: Props) {
  return (
    <div
      css={[
        styles.container,
        props.containerWidth && css({ width: props.containerWidth }),
      ]}
    >
      <header css={styles.header}>
        {props.showBackButton ? <TextButton title="< 戻る" /> : <div />}
        {props.showLogoutButton ? <TextButton title="ログアウト" /> : <div />}
      </header>
      <h1 css={styles.title}>{props.title}</h1>
      <div css={styles.body}>{props.children}</div>
    </div>
  )
}
