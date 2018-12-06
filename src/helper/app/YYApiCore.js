// function isApp () {
//   const ua = window.navigator.userAgent.toLowerCase()
//   if (/sada/i.test(ua)) {
//     return true
//   }
//   return false
// }

if (navigator.userAgent.match(/(iPad|iPhone|iPod).*?YY/g)) {
  if ((window.opener == null && window.YYApiCore == null) || (window.opener != null && window.opener.YYApiCore == null)) {
    // load YYApiCore
    var i = document.createElement('iframe')
    i.style.display = 'none'
    i.src = 'yyapi://load'
    document.body.appendChild(i)
  } else if (window.opener != null && window.YYApiCore == null && window.opener.YYApiCore != null) {
    window.YYApiCore = window.opener.YYApiCore
  }
} else if (navigator.userAgent.indexOf('Android') !== -1) {
  window.YYApiCore = {
    __GLOBAL_FUNC_INDEX__: 0,
    invokeClientMethod: function (module, name, parameters, callback) {
      var r
      try {
        var cbName = ''
        if (callback) {
          if (typeof callback === 'function') {
            cbName = window.YYApiCore.createGlobalFuncForCallback(callback)
          } else {
            cbName = callback
          }
        }
        r = JSON.parse(window.AndroidJSInterfaceV2.invoke(module, name, JSON.stringify(parameters || {}), cbName))
      } catch (e) {
        if (console) {
          console.log(e)
        }
      }
      return r
    },
    createGlobalFuncForCallback: function (callback) {
      if (callback) {
        var name = '__GLOBAL_CALLBACK__' + (window.YYApiCore.__GLOBAL_FUNC_INDEX__++)
        window[name] = function () {
          var args = arguments
          var func = (typeof callback === 'function') ? callback : window[callback]
          // we need to use setimeout here to avoid ui thread being frezzen
          setTimeout(function () {
            func.apply(null, args)
          }, 0)
        }
        return name
      }
      return null
    },
    invokeWebMethod: function (callback, returnValue) {
      window.YYApiCore.invokeCallbackWithArgs(callback, [returnValue])
    },

    invokeCallbackWithArgs: function (callback, args) {
      if (callback) {
        var func = null
        var tmp
        if (typeof callback === 'function') {
          func = callback
        } else if ((tmp = window[callback]) && typeof tmp === 'function') {
          func = tmp
        }
        if (func) {
          setTimeout(function () {
            func.apply(null, args)
          }, 0)
        }
      }
    }
  }
}
export default window.YYApiCore || {
  invokeClientMethod (...args) {
    // console.log(JSON.stringify(args))
    return false
  }
}
