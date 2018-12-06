const fs = require('fs')
const {filePath, remotePath} = require('./config')
const ext = require('./ext')
let fileList = []
function repalcePath (dir) {
  return dir.replace(filePath, remotePath)
}
function walk (path) {
  var dirList = fs.readdirSync(path)
  dirList.forEach(function (item) {
    if (fs.statSync(path + '/' + item).isDirectory()) {
      walk(path + '/' + item)
    } else {
      const rpath = repalcePath(path)
      item = (item === 'index.html') ? `${item}?` + Math.random() : item
      fileList.push(rpath + '/' + item)
    }
  })
}

walk(filePath)
// console.log(`fileList`, fileList)
fileList = fileList.concat(ext)

fs.writeFile(filePath + '/' + 'native.json', JSON.stringify(fileList, null, 2), 'utf-8', function (err) {
  if (err) throw err
  // console.log('写入成功')
})
