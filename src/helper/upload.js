export default function upload (file, path, cb) {
  var formData = new FormData()
  var xhr = new XMLHttpRequest()
  formData.append('file', file)

  xhr.open('POST', path, true)
  xhr.onprogress = function (e) {
    // cb && cb(`onprogress`,JSON.parse(e))
  }
  xhr.onload = function (e) {
    // console.log('onload',e)
    // cb && cb(`onload`,e)
    if (this.status === 200) {
      // cb && cb('onload 200',this.response)
      cb && cb('onload 200', JSON.parse(this.response)) // eslint-disable-line
      // console.log('onload 200',this.response)
    } else {
      cb && cb('onload error', JSON.parse(this.response)) // eslint-disable-line
      // cb && cb('onload error',this.statusText)
      // console.log('onload error',this.statusText)
    }
  }
  xhr.send(formData)
  // cb && cb()
}
