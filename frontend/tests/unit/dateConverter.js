import moment from "moment"
export function dateConverter(date) {
  moment.locale("th")
  return moment(date).format("LL")
}
