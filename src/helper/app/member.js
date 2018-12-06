import { VersionCompare } from '@/helper/v'
import YYApiCore from './YYApiCore'
export default {
  // 显示短信登陆界面
  smsLogin () {
    return YYApiCore.invokeClientMethod('ui', 'showSMSLoginView')
  },
  // 显示登陆界面
  windowLogin () {
    return YYApiCore.invokeClientMethod('ui', 'showLoginView')
  },
  // app版本
  appVersion () {
    // return YYApiCore.invokeClientMethod('device', 'appVersion', {})
    return new Promise(resolve => YYApiCore.invokeClientMethod('device', 'appVersion', {}, resolve))
  },
  // 登陆
  async login () {
    const appVersion = await this.appVersion()
    // console.log(`appVersion`, appVersion, VersionCompare(appVersion, '1.5.0'))
    if (VersionCompare(appVersion, '1.5.0')) {
      await this.smsLogin()
    } else {
      await this.windowLogin()
    }
  }
}
