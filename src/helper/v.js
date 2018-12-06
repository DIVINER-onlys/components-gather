/**
 * 版本比较 VersionCompare
 * @param {String} currVer 当前版本.
 * @param {String} promoteVer 比较版本.
 * @return {Boolean} false 当前版本小于比较版本返回 true.
 *
 * 使用
 * VersionCompare("6.3","5.2.5"); // false.
 * VersionCompare("6.1", "6.1"); // false.
 * VersionCompare("6.1.5", "6.2"); // true.
 */
export const VersionCompare = function (currVer, promoteVer) {
  currVer = currVer || '0.0.0'
  promoteVer = promoteVer || '0.0.0'
  if (currVer === promoteVer) return true
  var currVerArr = currVer.split('.')
  var promoteVerArr = promoteVer.split('.')
  var len = Math.max(currVerArr.length, promoteVerArr.length)
  for (var i = 0; i < len; i++) {
    let proVal = ~~promoteVerArr[i]
    let curVal = ~~currVerArr[i]
    if (proVal < curVal) {
      return false
    } else if (proVal > curVal) {
      return true
    }
  }
  return false
}
