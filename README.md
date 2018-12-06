# Efox-mobile Project

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8888
yarn start

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report
```
## 项目结构
### 根目录
```
efox-project
  |-src  ------------ 业务代码
  |-package-json  --- 依赖包
  |-vue.config.js --- vue配置文件
  |-.eslintrc.js  --- eslint配置文件
  |-.gitlab-ci.yml  - ci配置文件
  ...
```
### src目录
```
src
  |-pages  ----------- 项目页面:按路由分类页面
  |-modules  --------- 模块库:页面中各个模块
  |-components  ------ 通用组件库:存放所有通用组件
  |-router  ---------- vue-router文件
    |-a.js  ---------- 页面a的路由
    |-b.js  ---------- 页面b的路由
  |-stores  ---------- store文件
    |-a.js  ---------- store a
    |-b.js  ---------- store b
  |-assets  ---------- 资源文件夹:存放项目所有图片资源
  |-config  ---------- 公共配置文件
  |-hiidoLog  -------- 海度上报工具      
  |-helper  ---------- 通用工具库
    |-format  -------- 格式化工具
    |-upload  -------- 上传工具
    |-utils  --------- 其他基础工具
      |-cookie.js  --- cookie操作
      |-env.js     --- 环境判断
      |-...
    |-...
```


## api接口文档



## 代码库



## 项目文档


## 设计稿


## VSCODE 里面的eslint 配置
```
{
  "eslint.autoFixOnSave": true,
  "eslint.options": {
    "configFile": ".eslintrc.js"
  },
  "eslint.validate": [
      "javascript",{
          "language": "vue",
          "autoFix": true
      },"html",
      "vue"
  ]
}
```
