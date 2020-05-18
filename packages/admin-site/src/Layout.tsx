/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useHistory } from "react-router-dom"
import { SerializedStyles } from "@emotion/serialize"
import { useRecoilState } from "recoil"
import { TextButton } from "./parts"
import { signOut } from "./libs/firebase"
import { authState } from "./states"

type Props = {
  title: string
  containerWidth?: number
  showBackButton?: boolean
  backButtonStyle?: SerializedStyles
  showLogoutButton?: boolean
  children?: React.ReactNode
  onBack?: () => void
}

export default function Layout(props: Props) {
  const history = useHistory()
  const [, setLoggedIn] = useRecoilState(authState)

  async function signOutWithMessage() {
    console.log("signOutWithMessage()")
    try {
      await signOut()
      setLoggedIn(false)
      window.alert("ログアウトしました。")
    } catch (e) {
      console.log(e)
      return
    }
  }

  return (
    <div
      css={[
        styles.container,
        props.containerWidth && css({ width: props.containerWidth }),
      ]}
    >
      <header css={styles.header}>
        {props.showBackButton ? (
          <TextButton
            styles={[props.backButtonStyle]}
            title="< 戻る"
            onClick={() => {
              if (props.onBack) {
                props.onBack()
              } else {
                history.goBack()
              }
            }}
          />
        ) : (
          <div />
        )}
        {props.showLogoutButton ? (
          <TextButton title="ログアウト" onClick={signOutWithMessage} />
        ) : (
          <div />
        )}
      </header>
      <h1 css={styles.title}>{props.title}</h1>
      <div css={styles.body}>{props.children}</div>
    </div>
  )
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
    position: "relative",
  }),
  title: css({
    marginTop: 16,
    textAlign: "center",
  }),
  body: css({
    marginTop: 70,
  }),
}
