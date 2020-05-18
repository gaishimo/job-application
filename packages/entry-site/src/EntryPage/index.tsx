/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useState, Fragment } from "react"
import { useFormik } from "formik"
import TextareaAutoSize from "react-autosize-textarea"
import * as Yup from "yup"
import BarLoader from "react-spinners/BarLoader"
import { JOB_DATA } from "@etco-job-application/core"
import * as apiRequests from "../libs/apiRequests"
import FieldGroup from "./parts/FieldGroup"
import { range } from "../utils/numberUtils"

const styles = {
  page: css({
    width: 500,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 40,
    paddingBottom: 200,
  }),
  header: css({
    textAlign: "center",
    marginBottom: 80,
  }),
  guide: css({
    textAlign: "center",
  }),
  form: css({
    marginTop: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  }),
  input: css({
    width: "94%",
    margin: 0,
  }),
  inputErrored: css({
    borderColor: "red",
  }),
  textarea: css({
    width: "94%",
    height: 200,
  }),
  select: css({
    width: "100%",
  }),
  policyArea: css({
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),

  policyGuide: css({
    fontSize: "0.9rem",
    textAlign: "center",
  }),
  policyAgreement: css({
    marginTop: 30,
    display: "flex",
    alignItems: "center",
  }),
  checkbox: css({
    marginRight: 8,
  }),

  policyAgreementLabel: css({
    cursor: "pointer",
  }),
  policyAgreementError: css({
    marginTop: 12,
    minHeight: 30,
    color: "red",
    fontSize: "0.9rem",
  }),
  action: css({
    marginTop: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  submit: css({
    minWidth: 300,
    padding: "14px 20px",
  }),
  progressBar: css({ borderRadius: 2 }),
  entrySent: css({
    textAlign: "center",
    marginBottom: 100,
  }),
}

type Fields = {
  name: string
  email: string
  age: string
  jobId: string
  reason: string
  policyAgreement: boolean
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("氏名を入力してください")
    .max(50, "氏名は50文字以内で入力してください"),
  email: Yup.string()
    .required("メールアドレスを入力してください")
    .max(255, "255文字以内で入力してください")
    .email("メールアドレスのフォーマットが正しくありません"),
  age: Yup.number().required("年齢を選択してください"),
  jobId: Yup.string().required("希望職種を選択してください"),
  reason: Yup.string()
    .required("希望理由を入力してください")
    .max(3000, "希望理由は3,000文字以内で入力してください"),
  policyAgreement: Yup.boolean().oneOf(
    [true],
    "プライバシーポリシーへの同意が必要です",
  ),
})

export default function EntryPage() {
  const [entrySent, setEntrySent] = useState<boolean>(false)

  async function submit(values: Fields) {
    const fields = {
      name: values.name.trim(),
      email: values.email.trim(),
      age: parseInt(values.age, 10),
      jobId: values.jobId,
      reason: values.reason.trim(),
    }
    try {
      await apiRequests.addJobEntry(fields)
      setEntrySent(true)
    } catch (e) {
      if (e.response?.status === 400) {
        window.alert(
          "登録に失敗しました。入力値が正しいかどうかご確認ください。",
        )
      } else {
        window.alert(
          "登録に失敗しました。ネットワーク環境をご確認のうえ再度お試しください。",
        )
      }
    }
    // form.setSubmitting(false)
  }

  const form = useFormik<Fields>({
    initialValues: {
      name: "",
      email: "",
      age: "30",
      jobId: "",
      reason: "",
      policyAgreement: false,
    },
    validationSchema,
    onSubmit: submit,
  })

  function hasError(field: keyof Fields) {
    return form.touched[field] === true && form.errors[field] != null
  }
  function getErrorOf(field: keyof Fields) {
    return form.touched[field] ? form.errors[field] : null
  }

  const submittable =
    Object.keys(form.errors).length === 0 && form.values.policyAgreement

  return (
    <section>
      <div css={styles.page}>
        <h1 css={styles.header}>求人エントリー</h1>
        {entrySent ? (
          <div css={styles.entrySent}>
            ご応募ありがとうございます。エントリーを受け付けました。
            <br />
            後日、担当よりご連絡させていただきます。
          </div>
        ) : (
          <Fragment>
            <div css={styles.guide}>
              ご応募される方は以下のフォームよりお願いします。
            </div>
            <form css={styles.form} onSubmit={form.handleSubmit}>
              <FieldGroup
                label="氏名"
                fieldId="name"
                error={getErrorOf("name")}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  css={[styles.input, hasError("name") && styles.inputErrored]}
                  placeholder="応募 太郎"
                  {...form.getFieldProps("name")}
                />
              </FieldGroup>
              <FieldGroup
                label="メールアドレス"
                fieldId="email"
                error={getErrorOf("email")}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  css={[styles.input, hasError("email") && styles.inputErrored]}
                  placeholder="mail@example.com"
                  {...form.getFieldProps("email")}
                />
              </FieldGroup>
              <FieldGroup label="年齢" fieldId="age" error={getErrorOf("age")}>
                <select
                  id="age"
                  name="age"
                  css={[styles.select, hasError("age") && styles.inputErrored]}
                  {...form.getFieldProps("age")}
                >
                  <option key="default" value={""}>
                    選択してください
                  </option>
                  {range(1, 100).map(i => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup
                label="希望職種"
                fieldId="job"
                error={getErrorOf("jobId")}
              >
                <select
                  id="jobId"
                  name="jobId"
                  css={[
                    styles.select,
                    hasError("jobId") && styles.inputErrored,
                  ]}
                  {...form.getFieldProps("jobId")}
                >
                  <option key="default" value="">
                    選択してください
                  </option>
                  {JOB_DATA.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.name}
                    </option>
                  ))}
                </select>
              </FieldGroup>
              <FieldGroup
                label="希望理由"
                fieldId="reason"
                error={getErrorOf("reason")}
              >
                <TextareaAutoSize
                  id="reason"
                  name="reason"
                  css={[
                    styles.textarea,
                    hasError("reason") && styles.inputErrored,
                  ]}
                  {...form.getFieldProps("reason")}
                  placeholder="志望動機、自己PR等ご入力ください"
                />
              </FieldGroup>
              <div css={styles.policyArea}>
                <p css={styles.policyGuide}>
                  個人情報のお取り扱いについては
                  <br />
                  <a
                    href="https://example.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    プライバシーポリシー
                  </a>
                  をご確認ください。
                </p>
                <div css={styles.policyAgreement}>
                  <input
                    type="checkbox"
                    id="policyAgreement"
                    name="policyAgreement"
                    css={styles.checkbox}
                    {...form.getFieldProps("policyAgreement")}
                  />
                  <label
                    htmlFor="policyAgreement"
                    css={styles.policyAgreementLabel}
                  >
                    プライバシーポリシーに同意する
                  </label>
                </div>

                <div css={styles.policyAgreementError}>
                  {getErrorOf("policyAgreement")}
                </div>
              </div>
              <div css={styles.action}>
                {form.isSubmitting ? (
                  <BarLoader
                    height={6}
                    width={200}
                    css={styles.progressBar}
                    color={"#007AFF"}
                  />
                ) : (
                  <button
                    css={styles.submit}
                    disabled={!submittable}
                    type="submit"
                  >
                    申し込み
                  </button>
                )}
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </section>
  )
}
