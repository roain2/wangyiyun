// 将时间戳转换为具体的日期（参数：时间戳）
export const timestampToDate = (timestamp: number | string) => {
  let time = new Date(timestamp)

  // 获取年份
  let year = time.getFullYear()

  // 获取月份
  let month: number | string = time.getMonth() + 1
  // 对月份进行处理
  month = month < 10 ? `0${month}` : month

  // 获取日期
  let date: number | string = time.getDate()
  // 对日期进行处理
  date = date < 10 ? `0${date}` : date

  return `${year}-${month}-${date}`
}

// 毫秒格式化为分钟+秒
export const msToMinSeconed = (ms: number) => {
  let duration = Math.floor(ms / 1000)
  let minute: number | string = Math.floor(duration / 60)
  let second: number | string = Math.floor(duration % 60)
  if (minute < 10) {
    minute = `0${minute}`
  }
  if (second < 10) {
    second = `0${second}`
  }
  return `${minute}:${second}`
}
