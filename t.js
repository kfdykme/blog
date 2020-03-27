// 输入 timestamp 标准日期 2020/03/27 14：41：00
//
// 14: 41 => 15:00
// 14：05 => 14:30




let f = function (time) {
  time = parseInt(time)
  let date = new Date(time)
  date.setSeconds(0)
  let m = date.getMinutes()
  if (m > 31) {
      let h = 1
      date.setHours( date.getHours() +1)
  } else {
      date.setHours(date.getHours() )
  }
  console.info(h)

  m = 0
  date.setMinutes(m)
  return date
}
