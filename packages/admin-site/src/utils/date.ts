import format from "date-fns/format"
import ja from "date-fns/locale/ja"

const LOCALES = {
  ja,
}

export function formatDate(
  d: Date | number,
  formatString: string,
  localeKey: keyof typeof LOCALES = "ja",
) {
  const locale = localeKey ? LOCALES[localeKey] : undefined
  return format(d, formatString, { locale })
}
