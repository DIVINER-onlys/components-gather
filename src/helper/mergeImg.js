/* eslint-disable */
function getImgWH (src, callback) {
  let Img = new Image()
  // Img.setAttribute('crossOrigin', 'anonymous')
  // console.log('Img.onload ', new Image().onload, new Image())
  Img.onload = () => {
    const {width, height} = Img
    if (width && height)callback && callback(Img, width, height)
  }
  Img.onerror = (e) => {
    console.log('onerror', e, JSON.stringify(e, ['message', 'arguments', 'type', 'name']))
  }
  Img.src = src
}

// type 前景图的尺寸位置类型, bgPicBase64 背景图, frontPicBase64 前景图的base64, callback 回调
export default (type, bgPicBase64, frontPicBase64, callback) => {
  let canvasWidth = 530 // 画布宽
  let canvasHeight = 240 // 画布高

  // 默认参数
  let image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    destX,
    destY,
    destWidth,
    destHeight,
    w = 390, // 在type为1时要容纳的最大宽度
    h = canvasHeight,
    scale,
    scaleHeight,
    dataURL,
    dataURLRight

  let canvas = document.createElement('canvas')
  let ctx = {}
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  ctx = canvas.getContext('2d')

  let canvasRight = document.createElement('canvas')
  let ctxRight = {}
  canvasRight.width = canvasWidth
  canvasRight.height = canvasHeight
  ctxRight = canvasRight.getContext('2d')

  getImgWH(bgPicBase64, (Img, width, height) => {
    switch (type) {
      case 1:// 上传时选择了长方型背景
        sourceX = 0 // 原图片剪裁的坐标X
        sourceY = 0 // 原图片剪裁的坐标Y
        sourceWidth = canvas.width // 原图片剪裁的宽度
        sourceHeight = h // 原图片剪裁的高度
        destX = 0 // 写入的坐标X
        destY = 0 // 写入的坐标Y
        destWidth = canvas.width // 写入的图片宽度
        destHeight = h // 写入的图片高度
        ctx.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)// 背景写入
        break
      case 2:// 上传时选择了正方形背景
        sourceX = 0
        sourceY = 0
        sourceWidth = canvas.width
        sourceHeight = canvas.width
        destX = parseInt((canvas.width - h) / 2)
        destY = 0
        destWidth = h
        destHeight = h
        ctx.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)// 背景写入
        ctxRight.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX * 2, destY, destWidth, destHeight)// 背景写入
        break
      case 3:// 上传时选择了无水印背景
        break
      case 4:// 制作字体时，选择了背景
        sourceX = 0 // 原图片剪裁的坐标X
        sourceY = 0 // 原图片剪裁的坐标Y
        sourceWidth = width // 原图片剪裁的宽度
        sourceHeight = height // 原图片剪裁的高度
        destX = 0 // 写入的坐标X
        destY = 0 // 写入的坐标Y
        destWidth = canvas.width // 写入的图片宽度
        destHeight = canvas.height // 写入的图片高度
        ctx.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)// 背景写入
        ctxRight.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)// 背景写入
        break
      default:// 必填，没有默认情况
        break
    }
    getImgWH(frontPicBase64, (Img, width, height) => {
      switch (type) {
        case 1:// 上传时选择了长方型背景
          break
        case 2:// 上传时选择了正方形背景
          w = 160 // 固定w为160
          break
        case 3:// 上传时选择了无水印背景
          w = canvasWidth
          break
        case 4:// 制作字体时，选择了背景
          break
        default:// 必填，没有默认情况
          break
      }

      scale = parseInt(width * 100 / w) / 100
      scaleHeight = parseInt(height / scale)

      sourceX = 0
      sourceY = (scaleHeight > h) ? parseInt(scale * (scaleHeight - h) / 2) : 0 // 截取开始位置Y
      sourceWidth = width
      sourceHeight = (scaleHeight > h) ? parseInt(h * scale) : height
      destX = parseInt((canvasWidth - w) / 2)
      destY = (scaleHeight > h) ? 0 : (h - scaleHeight) / 2
      destWidth = w
      destHeight = (scaleHeight > h) ? h : scaleHeight

      switch (type) {
        case 1:// 上传时选择了长方型背景
          ctx.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
          dataURL = canvas.toDataURL('image/png')
          dataURLRight = dataURL
          break
        case 2:// 上传时选择了正方形背景
          ctx.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
          ctxRight.drawImage(Img, sourceX, sourceY, sourceWidth, sourceHeight, destX + 145, destY, destWidth, destHeight)
          dataURL = canvas.toDataURL('image/png')
          dataURLRight = canvasRight && canvasRight.toDataURL('image/png') || dataURL
          break
        case 3:// 上传时选择了无水印背景
          ctx.drawImage(Img, 0, 0, width, height, (canvasWidth - parseInt(width * canvasHeight / height)) / 2, 0, parseInt(width * canvasHeight / height), canvasHeight)
          if ((canvasWidth - parseInt(width * canvasHeight / height)) >= 0)ctxRight.drawImage(Img, 0, 0, width, height, (canvasWidth - parseInt(width * canvasHeight / height)), 0, parseInt(width * canvasHeight / height), canvasHeight)
          dataURL = canvas.toDataURL('image/png')
          dataURLRight = (canvasRight && canvasRight.toDataURL('image/png') || dataURL)
          if (((canvasWidth - parseInt(width * canvasHeight / height)) < 0))dataURLRight = dataURL
          break
        case 4:// 制作字体时，选择了背景
          ctx.drawImage(Img, sourceX, sourceY, width, height, 0, 0, canvasWidth, canvasHeight)
          dataURL = canvas.toDataURL('image/png')
          dataURLRight = dataURL
          break
        default:// 必填，没有默认情况
          break
      }
      Img = null
      callback && callback(dataURL, dataURLRight)
    })
  })
}
