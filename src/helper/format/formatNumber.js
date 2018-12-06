export default function (num) {
  if (num < 1000) {
    return num
  }
  if (num >= 1000 && num < 1000000) {
    return ((num / 1000).toFixed(1) + 'K')
  }
  if (num > 1000000) {
    return ((num / 1000000).toFixed(1) + 'M')
  }
}
