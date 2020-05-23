import React, { useState, useCallback, useRef } from "react"
import {
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Linking,
  Platform,
} from "react-native"
import { KeyboardAwareScrollView as ScrollView } from "react-native-keyboard-aware-scroll-view"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import { JOB_DATA, getJobName } from "@etco-job-application/core"
import Header from "./parts/Header"
import FieldGroup from "./parts/FieldGroup"
import PickerField from "./parts/PickerField"
import Checkbox from "./parts/Checkbox"
import PrimaryButton from "./parts/PrimaryButton"
import ProgressBar from "./parts/ProgressBar"
import TextButton from "./parts/TextButton"

import { Colors, FontSizes } from "../../values"
import * as apiRequests from "../../libs/apiRequests"
import { range } from "../../utils/numberUtils"

type Fields = {
  name: string
  email: string
  age: string
  jobId: string
  reason: string
}

const initialValue = {
  name: "",
  email: "",
  age: "",
  jobId: "",
  reason: "",
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

export default function EntryScreen() {
  const emailInput = useRef<TextInput>(null)

  const [focusingField, setFocusingField] = useState<keyof Fields | null>(null)
  const [policyAgreed, togglePolicyAgreed] = useState<boolean>(false)
  const [entrySent, setEntrySent] = useState<boolean>(false)

  function inputProps(f: FormikProps<Fields>, field: keyof Fields) {
    return {
      onChangeText: f.handleChange(field),
      onBlur: f.handleBlur(field),
      onFocus: () => setFocusingField(field),
      value: f.values[field],
    }
  }

  const onPressBackground = useCallback(() => {
    setFocusingField(null)
  }, [])

  const submit = useCallback(async (values: Fields) => {
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
        Alert.alert(
          "登録に失敗しました。入力値が正しいかどうかご確認ください。",
        )
      } else {
        Alert.alert(
          "登録に失敗しました。ネットワーク環境をご確認のうえ再度お試しください。",
        )
      }
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header title="求人エントリー" />
      {entrySent ? (
        <View style={styles.entrySent}>
          <View style={styles.entrySentMessage}>
            <Text style={styles.entrySentMessageText}>
              ご応募ありがとうございます。{"\n"}
              エントリーを受け付けました。{"\n"}
              後日、担当よりご連絡させていただきます。
            </Text>
          </View>
          <View style={styles.entrySentAction}>
            <TextButton title="戻る" onPress={() => setEntrySent(false)} />
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.guide}>
            <Text style={styles.guideText}>
              応募される方は以下のフォームよりお願いします。
            </Text>
          </View>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {f => {
              const submittable =
                validationSchema.isValidSync(f.values) && policyAgreed

              function hasError(field: keyof Fields) {
                return f.touched[field] === true && f.errors[field] != null
              }
              function getErrorOf(field: keyof Fields) {
                return f.touched[field] ? f.errors[field] : null
              }

              return (
                <TouchableWithoutFeedback onPress={onPressBackground}>
                  <View style={styles.form}>
                    <FieldGroup
                      label="氏名"
                      focusing={focusingField === "name"}
                      error={getErrorOf("name")}
                    >
                      <TextInput
                        autoFocus
                        returnKeyType="next"
                        style={[
                          styles.textInput,
                          hasError("name") && styles.textInputErrored,
                        ]}
                        maxLength={50}
                        {...inputProps(f, "name")}
                        onSubmitEditing={() => emailInput.current?.focus()}
                      />
                    </FieldGroup>
                    <FieldGroup
                      label="メールアドレス"
                      focusing={focusingField === "email"}
                      error={getErrorOf("email")}
                    >
                      <TextInput
                        ref={emailInput}
                        returnKeyType="next"
                        style={[
                          styles.textInput,
                          hasError("email") && styles.textInputErrored,
                        ]}
                        onSubmitEditing={() => {
                          setFocusingField("age")
                        }}
                        {...inputProps(f, "email")}
                      />
                    </FieldGroup>
                    <FieldGroup
                      label="年齢"
                      focusing={focusingField === "age"}
                      error={focusingField === "age" ? null : getErrorOf("age")}
                    >
                      <PickerField
                        selecting={focusingField === "age"}
                        selectedLabel={
                          f.values.age
                            ? `${f.values.age} 歳`
                            : "選択してください"
                        }
                        initialValueForIOS={"30"}
                        selectedValue={f.values.age}
                        options={range(1, 100).map(i => ({
                          value: i.toString(),
                          label: i.toString(),
                        }))}
                        onPressSelectedValue={() => {
                          setFocusingField(
                            focusingField === "age" ? null : "age",
                          )
                          f.setFieldTouched("age")
                        }}
                        onValueChange={value => {
                          f.setFieldTouched("age")
                          f.setFieldValue("age", value)
                          setFocusingField(null)
                        }}
                      />
                    </FieldGroup>
                    <FieldGroup
                      label="希望職種"
                      focusing={focusingField === "jobId"}
                      error={
                        focusingField === "jobId" ? null : getErrorOf("jobId")
                      }
                    >
                      <PickerField
                        selecting={focusingField === "jobId"}
                        selectedLabel={
                          f.values.jobId
                            ? getJobName(f.values.jobId)
                            : "選択してください"
                        }
                        initialValueForIOS={""}
                        selectedValue={
                          f.values.jobId === "" ? "" : f.values.jobId
                        }
                        options={JOB_DATA.map(({ id, name }) => ({
                          value: id.toString(),
                          label: name,
                        }))}
                        onPressSelectedValue={() => {
                          setFocusingField(
                            focusingField === "jobId" ? null : "jobId",
                          )
                          f.setFieldTouched("jobId")
                        }}
                        onValueChange={value => {
                          f.setFieldValue("jobId", value)
                          setFocusingField(null)
                        }}
                      />
                    </FieldGroup>
                    <FieldGroup
                      label="希望理由"
                      focusing={focusingField === "reason"}
                      error={getErrorOf("reason")}
                    >
                      <TextInput
                        style={[styles.textInput, styles.textarea]}
                        multiline
                        numberOfLines={4}
                        placeholder=""
                        placeholderTextColor="#C8C8C8"
                        {...inputProps(f, "reason")}
                      />
                    </FieldGroup>
                    <View style={styles.policyArea}>
                      <View style={styles.policyGuide}>
                        <Text style={styles.policyGuideText}>
                          個人情報の取り扱いについては{"\n"}
                          <Text
                            style={styles.policyLink}
                            onPress={() => {
                              Linking.openURL("https://example.com")
                            }}
                          >
                            プライバシーポリシー
                          </Text>
                          をご確認ください
                        </Text>
                      </View>
                      <View style={styles.policyAgreement}>
                        <Checkbox
                          label="プライバシーポリシーに同意する"
                          on={policyAgreed}
                          onPress={() => togglePolicyAgreed(!policyAgreed)}
                        />
                      </View>
                    </View>
                    <View style={styles.action}>
                      <View style={styles.actionContent}>
                        {f.isSubmitting ? (
                          <ProgressBar />
                        ) : (
                          <PrimaryButton
                            title="申し込み"
                            disabled={!submittable}
                            onPress={f.handleSubmit}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
          </Formik>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  entrySent: {
    alignItems: "center",
    paddingTop: 30,
  },
  entrySentMessage: {
    width: "80%",
    maxWidth: 500,
  },
  entrySentMessageText: {
    color: Colors.text1,
    fontSize: FontSizes.M,
    lineHeight: FontSizes.M * 1.3,
    textAlign: "center",
  },
  entrySentAction: {
    marginTop: 30,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {},
  guide: {
    paddingVertical: 40,
    alignItems: "center",
  },
  guideText: {
    color: Colors.text1,
    fontSize: FontSizes.M,
    textAlign: "center",
  },
  form: {
    paddingBottom: 50,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E6E6",
    backgroundColor: "white",
    paddingHorizontal: 12,
    // paddingVertical: 12,
    color: Colors.text1,
    fontSize: FontSizes.L,
    letterSpacing: FontSizes.L * 0.05,
  },
  textInputErrored: {
    backgroundColor: Colors.danger10Percent,
  },
  textarea: {
    height: 160,
    padding: 8,
    alignItems: "flex-start",
    textAlignVertical: "top",
  },
  policyArea: {
    marginVertical: 20,
    alignItems: "center",
  },
  policyGuide: {},
  policyGuideText: {
    textAlign: "center",
    fontSize: FontSizes.M,
    lineHeight: FontSizes.M * 1.4,
  },
  policyAgreement: {
    marginVertical: 12,
  },
  policyLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  action: {
    alignItems: "center",
  },
  actionContent: {
    width: 280,
    alignItems: "stretch",
  },
})
