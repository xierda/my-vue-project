import config from '@/config'

export default function MapLoader () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var url = `https://webapi.amap.com/maps?v=1.4.15&key=${config.mapKey}&callback=initAMap&&plugin=AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.MouseTool`
      var jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.type = 'text/javascript'
      jsapi.async = true
      jsapi.src = url
      jsapi.onerror = reject
      document.head.appendChild(jsapi)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}
