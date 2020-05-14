/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, FormEvent, useCallback } from "react"
import BarLoader from "react-spinners/BarLoader"
import Layout from "../../Layout"
import { FieldGroup } from "../../parts"
import { useControlledInput } from "../../libs/hooks"

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const email = useControlledInput("")
  const password = useControlledInput("")

  async function submit() {
    setIsSubmitting(true)
    try {
    } catch (e) {}
  }

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      submit()
    },
    [email.value, password.value],
  )

  const submittable =
    email.value.trim().length > 0 && password.value.trim().length > 0

  return (
    <Layout title="応募管理 ログイン" containerWidth={400}>
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
    width: "100%",
    margin: 0,
  }),
  action: css({
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  submit: css({
    minWidth: 300,
    padding: "14px 20px",
  }),
}
