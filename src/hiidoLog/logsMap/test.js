const dataMap = {
  // 全站pv统计
  allPv: {
    eventId: 20026801,
    actType: {
      pv: 101 // 打开页面
    }
  }
}

function logMethods (hiidoLog) {
  const eventId = dataMap.allPv.eventId
  return {
    pv () {
      console.log('全站统计pv')
      hiidoLog(eventId, 101)
    }
  }
}
export default logMethods
