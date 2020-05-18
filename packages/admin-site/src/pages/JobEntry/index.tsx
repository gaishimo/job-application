/** @jsx jsx */
import { css, jsx } from "@emotion/core"
import { useFormik } from "formik"
import { Fragment, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import TextareaAutoSize from "react-autosize-textarea"
import * as Yup from "yup"
import BarLoader from "react-spinners/BarLoader"
import {
  JOB_DATA,
  JobEntry,
  ENTRY_STATUS_IDS,
  getStatusName,
} from "@etco-job-application/core"
import Layout from "../../Layout"
import { FieldGroup } from "../../parts"
import { range } from "../../utils/numberUtils"
import {
  fetchJobEntry,
  updateJobEntry,
  deleteJobEntry,
} from "../../libs/logics"
import { formatDate } from "../../utils/date"

type Fields = {
  name: string
  email: string
  age: string
  jobId: string
  reason: string
  status: string
  memo: string
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("氏名を入力してください")
    .max(50, "氏名は50文字以内で入力してください"),
  email: Yup.string()
    .max(255, "255文字以内で入力してください")
    .required("メールアドレスを入力してください")
    .email("メールアドレスのフォーマットが正しくありません"),
  age: Yup.number().required("年齢を選択してください"),
  jobId: Yup.string().required("希望職種を選択してください"),
  reason: Yup.string()
    .required("希望理由を入力してください")
    .max(3000, "希望理由は3,000文字以内で入力してください"),
  status: Yup.string().required(),
  memo: Yup.string().max(3000, "メモは3,000文字以内で入力してください"),
})

export default function JobApplicationPage() {
  const { id } = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [fetchedJobEntry, setFetchedJobEntry] = useState<JobEntry | null>(null)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const form = useFormik<Fields>({
    initialValues: {
      name: "",
      email: "",
      age: "30",
      jobId: "",
      reason: "",
      status: ENTRY_STATUS_IDS.waiting,
      memo: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: submit,
  })

  function valueChanged() {
    if (fetchedJobEntry == null) return false
    const fetched = fetchedJobEntry as any
    return Object.entries(form.values).some(([key, value]) => {
      return `${fetched[key] || ""}` !== `${value}`
    })
  }

  const submittable =
    fetchedJobEntry && Object.keys(form.errors).length === 0 && valueChanged()
  const deletable =
    fetchedJobEntry && fetchedJobEntry.status === ENTRY_STATUS_IDS.done

  async function load() {
    const d = await fetchJobEntry(id)
    setLoading(false)
    if (d == null) {
      setNotFound(true)
      return
    }
    setFetchedJobEntry(d)
    form.setValues({
      name: d.name,
      email: d.email,
      age: d.age.toString(),
      jobId: d.jobId,
      reason: d.reason,
      status: d.status,
      memo: d.memo || "",
    })
  }

  function goBackWithConfirmation() {
    if (valueChanged()) {
      const ok = window.confirm("変更した内容を破棄してもよろしいですか?")
      if (ok) {
        history.goBack()
      }
    } else {
      history.goBack()
    }
  }

  async function deleteWithConfirmation() {
    if (!deletable) return
    const ok = window.confirm(
      "削除後は復元することはできません。削除してよろしいですか?",
    )
    if (!ok) return
    setDeleting(true)
    try {
      await deleteJobEntry(id)
      window.alert("応募を削除しました。")
      history.goBack()
    } catch (e) {
      window.alert("削除に失敗しました。")
    } finally {
      setDeleting(false)
    }
  }

  async function submit(values: Fields) {
    if (!submittable) return
    setSubmitting(true)
    const fields = {
      name: values.name,
      email: values.email,
      age: parseInt(values.age, 10),
      jobId: values.jobId,
      reason: values.reason,
      status: values.status,
      memo: values.memo,
    }
    try {
      await updateJobEntry(id, fields)
      await load()
      window.alert("更新しました。")
    } catch (e) {
      window.alert("登録に失敗しました。")
    } finally {
      setSubmitting(false)
    }
  }

  function hasError(field: keyof Fields) {
    return form.touched[field] === true && form.errors[field] != null
  }
  function getErrorOf(field: keyof Fields) {
    return form.touched[field] ? form.errors[field] : null
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Layout
      title="応募詳細"
      containerWidth={500}
      showBackButton
      backButtonStyle={styles.backButton}
      onBack={goBackWithConfirmation}
    >
      <div css={styles.page}>
        {loading && <div css={styles.loading}>Loading...</div>}
        {notFound && (
          <div css={styles.notFound}>応募データがみつかりません。</div>
        )}
        {!loading && !notFound && (
          <form css={styles.form} onSubmit={form.handleSubmit}>
            <FieldGroup label="氏名" fieldId="name" error={getErrorOf("name")}>
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
                css={[styles.select, hasError("jobId") && styles.inputErrored]}
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
                placeholder="志望動機、自己PR等"
              />
            </FieldGroup>
            <FieldGroup label="応募日時" fieldId="" error={null}>
              <div css={styles.textValue}>
                {fetchedJobEntry &&
                  formatDate(
                    fetchedJobEntry?.entriedAt,
                    "yyyy年MM月dd日(EEE) HH時mm分",
                  )}
              </div>
            </FieldGroup>
            <FieldGroup label="最終更新日時" fieldId="" error={null}>
              <div css={styles.textValue}>
                {fetchedJobEntry &&
                  formatDate(
                    fetchedJobEntry?.updatedAt,
                    "yyyy年MM月dd日(EEE) HH時mm分",
                  )}
              </div>
            </FieldGroup>
            <FieldGroup
              label="ステータス"
              fieldId="status"
              error={getErrorOf("status")}
            >
              <select
                id="status"
                name="status"
                css={[styles.select, hasError("status") && styles.inputErrored]}
                {...form.getFieldProps("status")}
              >
                {Object.values(ENTRY_STATUS_IDS).map(id => (
                  <option key={id} value={id}>
                    {getStatusName(id)}
                  </option>
                ))}
              </select>
            </FieldGroup>
            <FieldGroup label="メモ" fieldId="memo" error={getErrorOf("memo")}>
              <TextareaAutoSize
                id="memo"
                name="memo"
                css={[styles.textarea, hasError("memo") && styles.inputErrored]}
                {...form.getFieldProps("memo")}
                placeholder="メモがあれば記入"
              />
            </FieldGroup>
            <div css={styles.actions}>
              <Fragment>
                {deleting ? (
                  <BarLoader
                    height={6}
                    width={100}
                    css={styles.progressBar}
                    color={"#D0021B"}
                  />
                ) : (
                  <button
                    css={[styles.button, styles.delete]}
                    disabled={!deletable || submitting}
                    onClick={deleteWithConfirmation}
                  >
                    削除する
                  </button>
                )}
                {submitting ? (
                  <BarLoader
                    height={6}
                    width={100}
                    css={styles.progressBar}
                    color={"#007AFF"}
                  />
                ) : (
                  <button
                    css={[styles.button, styles.submit]}
                    disabled={!submittable || deleting}
                    type="submit"
                  >
                    更新する
                  </button>
                )}
              </Fragment>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}

const styles = {
  backButton: css({
    position: "absolute",
    left: -100,
  }),
  page: css({
    paddingBottom: 70,
  }),
  header: css({
    textAlign: "center",
    marginBottom: 80,
  }),
  loading: css({
    textAlign: "center",
    marginBottom: 50,
  }),
  notFound: css({
    textAlign: "center",
    marginBottom: 50,
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
    height: 160,
  }),
  select: css({
    width: "100%",
    backgroundColor: "rgb(252, 252, 252)",
  }),
  textValue: css({
    paddingLeft: 20,
  }),
  actions: css({
    marginTop: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  button: css({
    minWidth: 120,
    padding: "8px 20px",
  }),
  delete: css({
    borderColor: "#D0021B",
    color: "#D0021B",
    "&:disabled": {
      opacity: 0.4,
    },
  }),
  submit: css({}),
  progressBar: css({ borderRadius: 2 }),
}
