/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, FormEvent, useCallback } from "react"
import BarLoader from "react-spinners/BarLoader"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import Layout from "../../Layout"
import { FieldGroup } from "../../parts"
import { useControlledInput } from "../../libs/hooks"
import { signInWithEmail } from "../../libs/firebase"
import { actions as authActions } from "../../reduxModules/auth"

export default function LoginPage() {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>("")

  const email = useControlledInput("")
  const password = useControlledInput("")

  async function signIn() {
    setError(null)
    setIsSubmitting(true)
    try {
      await signInWithEmail(email.value, password.value)
      dispatch(authActions.setLoggedIn(true))
    } catch (e) {
      console.log(e)
      if (["auth/user-not-found", "auth/wrong-password"].includes(e.code)) {
        setError("メールアドレスとパスワードの組み合わせが異なります。")
      } else if (e.code === "auth/too-many-requests") {
        setError(
          "ログインできませんした。しばらく時間をおいて再度お試しください。",
        )
      } else {
        setError(
          "ログインできませんした。ネットワーク環境をご確認の上、再度お試しください。",
        )
      }
      setIsSubmitting(false)
    }
  }

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      signIn()
    },
    [email.value, password.value],
  )

  const submittable =
    email.value.trim().length > 0 && password.value.trim().length > 0

  return (
    <Layout title="応募管理 ログイン" containerWidth={440}>
      <div css={styles.container}>
        <form onSubmit={onSubmit}>
          <FieldGroup label="メールアドレス" fieldId="email" error={null}>
            <input
              id="email"
              name="email"
              type="email"
              css={[styles.input]}
              placeholder="mail@example.com"
              {...email}
            />
          </FieldGroup>
          <FieldGroup label="パスワード" fieldId="password" error={null}>
            <input
              id="password"
              name="password"
              type="password"
              css={[styles.input]}
              placeholder="*********"
              {...password}
            />
          </FieldGroup>
          <div css={styles.errorMessage}>{error}</div>
          <div css={styles.action}>
            {isSubmitting ? (
              <BarLoader height={6} width={200} color={"#007AFF"} />
            ) : (
              <button css={styles.submit} disabled={!submittable} type="submit">
                ログイン
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  )
}

const styles = {
  container: css({
    paddingTop: 60,
  }),
  input: css({
    width: "94%",
    margin: 0,
  }),
  action: css({
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  submit: css({
    minWidth: 300,
    padding: "14px 20px",
  }),
  errorMessage: css({
    width: "100%",
    marginTop: 20,
    minHeight: 40,
    color: "red",
  }),
}
