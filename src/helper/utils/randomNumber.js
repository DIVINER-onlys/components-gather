/**
 * 生产 n 位随机数
 * @param  {[Number]} bit [生成的位数]
 * @return {[String]}     [返回的随机数]
 */
function randomNumSet (bit) {
  let len = bit
  let possible = '0123456789abcdefghijklmnopqrstuvwxyz'
  let i = 0
  let str = ''
  for (; i < len; i++) {
    str += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return str
}

export default randomNumSet
