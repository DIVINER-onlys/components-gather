let Toast = {}
let showToast = false // 存储toast显示状态
let toastVm = null // 存储toast vm
let showLoad = false // 存储loading显示状态
let loadNode = null // 存储loading节点元素

Toast.install = function (Vue, options) {
  let opt = {
    defaultType: 'bottom',
    duration: '2500',
    wordWrap: false
  }
  for (let property in options) {
    opt[property] = options[property]
  }

  /**
   * @param {*} tips 提示语
   * @param {*} duration 显示时间
   * @param {*} styleOptions 自定义样式选项 传入样式对象
   * @param {*} type toast显示位置 默认center 可选top center bottom, 其他不生效
   * @param {*} mask 遮罩层 true Or false
   */
  Vue.prototype.$toast = function (tips, duration = 0, styleOptions, type, mask) {
    let curType = type || opt.defaultType
    let wordWrap = opt.wordWrap ? 'lx-word-wrap' : ''
    let tmp = `
    <div>
      <div v-show="show" :class="type" class="lx-toast ${wordWrap}" :style="styleOptions">
        {{tip}}
      </div>
      ${mask ? '<div class="lx-mark" v-show="show"></div>' : ''}
    </div>
    `
    if (showToast) {
      // 如果toast还在，则不再执行
      return
    }
    if (!toastVm) {
      let ToastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips,
            styleOptions: styleOptions,
            type: 'lx-toast-' + curType
          }
        },
        template: tmp
      })
      toastVm = new ToastTpl()
      let tpl = toastVm.$mount().$el
      document.body.appendChild(tpl)
    }
    toastVm.show = showToast = true
    toastVm.tip = tips
    toastVm.styleOptions = styleOptions
    toastVm.type = 'lx-toast-' + curType

    setTimeout(function () {
      toastVm.show = showToast = false
    }, duration || opt.duration)
  };

  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (tips) {
      return Vue.prototype.$toast(tips, 2500, {}, type)
    }
  })

  /**
   *
   * @param {*} tips 提示信息
   * @param {*} type 值为close时关闭loading
   * @param {*} loadingBackground loading的背景颜色
   * @param {*} loadingStyle loading的样式
   * @param {*} tipsStyle 提示语样式
   */
  Vue.prototype.$loading = function (tips, type, loadingBackground, loadingStyle, tipsStyle) {
    if (type === 'close') {
      loadNode.show = showLoad = false
      let markNode = document.querySelector('.lx-load-mark')
      if (markNode) {
        markNode.remove()
      }
    } else {
      if (showLoad) {
        // 如果loading还在，则不再执行
        return
      }
      let LoadTpl = Vue.extend({
        data: function () {
          return {
            show: showLoad,
            loadingBackground,
            loadingStyle,
            tipsStyle
          }
        },
        template: `
        <div v-show="show" class="lx-load-mark">
          <div class="lx-load-box" :style="loadingBackground">
            <div class="lds-rolling" :style="loadingStyle"><div></div></div>
            <div class="lx-load-content" :style="tipsStyle">${tips}</div>
          </div>
        </div>
        `
      })
      loadNode = new LoadTpl()
      let tpl = loadNode.$mount().$el
      document.body.appendChild(tpl)
      loadNode.show = showLoad = true
      loadNode.loadingBackground = loadingBackground
      loadNode.loadingStyle = loadingStyle
      loadNode.tipsStyle = tipsStyle
    }
  };

  ['open', 'close'].forEach(function (type) {
    Vue.prototype.$loading[type] = function (tips) {
      return Vue.property.$loading(tips, type)
    }
  })
}
export default Toast
