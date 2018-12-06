/* eslint-disable */
let env = PROJECT_ENV
let version = PROJECT_VERSION
let config = require(`./${PROJECT_ENV}`).default
config = Object.assign({
  env,
  version
}, config)
export default config
