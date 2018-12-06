function get (url, type, callback) { // 网络url图片的base64转换
  // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
  // console.log('get-------', type)
  if (!type) type = 'png'
  console.log(`imageBase64 111`, url)
  let Img = new Image()
  Img.crossOrigin = 'Anonymous'
  let dataURL = ''
  // console.log('Img.src-------', url)
  Img.onload = function () {
    // console.log('Img.onload-------')
    console.log(`imageBase64 222`)
    let canvas = document.createElement('canvas') // 创建canvas元素
    let width = Img.width // 确保canvas的尺寸和图片一样
    let height = Img.height
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d').drawImage(Img, 0, 0, width, height) // 将图片绘制到canvas中
    dataURL = canvas.toDataURL('image/' + type) // 转换图片为dataURL
    // console.log('dataURL-------', dataURL)
    Img.onload = null
    Img = null
    callback(dataURL, width, height)
  }
  Img.src = url
}
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result, reader.width, reader.height))
  reader.readAsDataURL(img)
}
export default { get, getBase64 }
