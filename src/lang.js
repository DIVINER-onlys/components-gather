import Vue from 'vue'
import VueI18n from 'vue-i18n'
import localstage from '@/helper/localstorage'

Vue.use(VueI18n)

// 获取用户浏览器优先选择语言
function getLanguage () {
  const language = navigator.language ? navigator.language : navigator.browserLanguage
  return language
}

// $route.path 多配置了一个'/'的问题
function checkPath (path) {
  if (path.charAt(path.length - 1) === '/') {
    path = path.substring(0, path.length - 1)
  }
  return path
}
export const i18n = new VueI18n()

export async function loadLanguageAsync ($route) {
  let localLang = localstage.get('language')
  let lang = 'en-US'
  let langPackage = {}
  let langKey = $route.path.substr(1).replace('/', '_')
  langKey = /pc/.test(langKey) ? langKey.replace('/pc', '') : langKey
  langKey = checkPath(langKey)
  //
  if ($route.query.lang) {
    lang = $route.query.lang
  } else if (Object.keys(localLang).length > 0) {
    lang = localLang
  } else {
    lang = getLanguage()
  }
  //
  localstage.set('language', lang)
  // 语言包初始化
  i18n.locale = lang
  if (!i18n.messages[langKey]) {
    let path = /pc/.test($route.path) ? $route.path.replace('/pc', '') : $route.path
    path = checkPath(path)
    try {
      let lan = lang.split('-')[0]
      langPackage = await import(/* webpackChunkName: "[request]" */`@/pages${path}/lang/${lan}`)
    } catch (e) {
      lang = 'en-US'
      i18n.locale = lang
      let lan = lang.split('-')[0]
      langPackage = await import(/* webpackChunkName: "[request]" */`@/pages${path}/lang/${lan}`)
    }

    langPackage = langPackage.default
    const message = {}
    message[langKey] = langPackage
    i18n.mergeLocaleMessage(lang, message)
  }

  // 设置标题title
  if (langPackage.html_title) {
    window.document.title = langPackage.html_title
  }
}
