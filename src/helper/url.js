const querystring = require('querystring')
export default {
  query () {
    let searchStr = location.search
    let hashStr = location.hash
    searchStr = searchStr.replace('?', '')
    hashStr = hashStr.replace('#', '')
    let query = querystring.parse(searchStr)
    let hash = querystring.parse(hashStr)
    return { ...hash, ...query }
  }
}
