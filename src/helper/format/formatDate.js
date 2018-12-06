function setObj (date) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  return o
}

function resetDate (date, o, format) {
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return format
}

// 重置时间格式
function formatDate (timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  let date = new Date(timestamp)
  const o = setObj(date)
  return resetDate(date, o, format)
}

// 获取前后N天
function getDateStr (timestamp, AddDayCount, type = 'yyyy-MM-dd') {
  let date = new Date(timestamp)
  date.setDate(date.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  const o = setObj(date)
  return resetDate(date, o, type)
}

export default { formatDate, getDateStr }
