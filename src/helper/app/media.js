export default {
  file (url) {
    if (window.lighten) {
      return window.lighten.shouldOverrideMediaUrl(url)
    }
    return url
  }
}
