import logsMap from './logsMap/index'

export default function logsMapInit (moduleNames) {
  const modulesData = moduleNames.split(',')
  const obj = {}
  modulesData.map(item => {
    obj[item] = logsMap[item]
  })
  console.log(obj)
  return obj
}
