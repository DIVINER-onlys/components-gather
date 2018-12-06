const { atob, btoa } = window
export const arrayBufferToBase64 = function (buffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  console.log(`arrayBufferToBase64`, bytes)
  return btoa(binary)
}
export const base64ToArrayBuffer = function (base64) {
  var binaryString = atob(base64)
  var len = binaryString.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}
