/*
 * 默认对象
 */
const doc = document

/*
* 数组去重
* 传key则根据key去重
*/

function arrayUnique (array, key) {
  let obj = {}
  return array.filter(function (item, index, array) {
    const objKey = key ? item[key] : JSON.stringify(item)

    return obj.hasOwnProperty(objKey) ? false : (obj[objKey] = true)
  })
}
/*
 * @method 函数节流
 * @param {Function} method : 需要节流的函数对象
 * @param {Object} context : 函数执行上下文，默认window
 * @param {Number} timeout : 节流延时，单位：毫秒
 * @return {Null} null
*/
function throttle (method, timeout = 50, parms) {
  clearTimeout(method.tId)
  method.tId = setTimeout(function () {
    method(parms)
  }, timeout)
}

/*
 * @method 滚动监听
 * @param {Object} dom : 需要监听的dom对象
 * @param {Function} method : 监听滚动时候执行的方法
 * @param {Number} timeout : 节流延时，单位：毫秒
 * @return {Null} null
 * 在method执行前会把当前的scrollTop、scrollHeight、height返回
*/
function scrollWatch (dom = doc.body, method, timeout = 50) {
  dom.addEventListener('scroll', () => {
    const scrollHeight = dom.scrollHeight
    const scrollTop = dom.scrollTop
    const height = dom.clientHeight
    throttle(method, timeout, { scrollHeight, scrollTop, height })
  })
}

export default { arrayUnique, throttle, scrollWatch }
