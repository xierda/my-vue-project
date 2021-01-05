<template>
<div class="map-page">
  <div id="container" class="map-wrapper"></div>
  <MapToolsTop
    class="map-tools-top"
    @handle-tooles="handleTooles"/>
</div>
</template>

<script>
import MapLoader from '@/utils/Amap.js'
import MapToolsTop from './MapToolsTop'
export default {
  components: {
    MapToolsTop
  },
  data () {
    return {
      map: null,
      mouseTool: null,
      trafficLayer: null,
      lineArr: [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]]
    }
  },
  created() {
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      MapLoader().then(AMap => {
        const map = new AMap.Map('container', {
          center: [116.397428, 39.90923],
          zoom: 17,
          resizeEnable: true,
          layers: [
            // new AMap.TileLayer.Traffic(),
            // new AMap.TileLayer.RoadNet()
          ]
        })
        map.on('complete', () => {
          this.map = map
          this.mouseTool = new AMap.MouseTool(map)
          this.trafficLayer = new AMap.TileLayer.Traffic({
            map,
            zIndex: 10
          })
          this.trafficLayer.hide()
          const toolbar = new AMap.ToolBar({
            liteStyle: true,
          })
          const scale = new AMap.Scale({
            visible: true
          })
          map.addControl(toolbar)
          map.addControl(scale)

          const marker = new AMap.Marker({
            map: map,
            position: [116.478935,39.997761],
            icon: "https://webapi.amap.com/images/car.png",
            offset: new AMap.Pixel(-26, -13),
            autoRotation: true,
            angle:-90,
          })

          // 绘制轨迹
          new AMap.Polyline({
            map: map,
            path: this.lineArr,
            showDir:true,
            strokeColor: "#28F",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6,      //线宽
            // strokeStyle: "solid"  //线样式
          })

          let passedPolyline = new AMap.Polyline({
            map: map,
            // path: lineArr,
            strokeColor: "#AF5",  //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6,      //线宽
            // strokeStyle: "solid"  //线样式
          });

          marker.on('moving', function (e) {
            passedPolyline.setPath(e.passedPath);
          })

          map.setFitView();

          marker.moveAlong(this.lineArr, 200);
          // marker.pauseMove();
          // marker.resumeMove();
          // marker.stopMove();

        })

        map.on('click', this.openInfo)
        // map.on('dblclick', this.closeMouseTool)
        // map.on('click', function(e) {
        //   console.log(e)
        //   // e.lnglat.getLng() + ',' + e.lnglat.getLat()
        // })
      }, e => {
        console.log('地图加载失败', e)
      })
    },
    handleTooles (key) {
      switch (key) {
        case 'lk':
          this.trafficLayer.show()
          break;
        case 'xd':
          break;
        case 'cj':
          this.mouseTool.rule({})
          break;
        case 'cm':
          this.mouseTool.measureArea({})
          break;
        case 'qt':
          this.mouseTool.close(true)
          break;
      
        default:
          this.trafficLayer.hide()
          this.mouseTool.close()
          break;
      }
    },
    openInfo (e) {
      console.log(e)
      // let random = this.getRandom()
      // this.searchModuleSearch = random
      // if (this.jihuoXuanDian) {
      //   this.openInfo(e.lnglat.getLng(), e.lnglat.getLat())
      // }

      // var info = []
      // info.push("电话 : 010-84107000   邮编 : 100102")
      // info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>")
      // this.infoWindow = new AMap.InfoWindow({
      //   content: info.join("<br/>")
      // })
      // this.infoWindow.open(map, map.getCenter())
    },
    // addTrafficLayer () {
    //   if (!this.trafficLayer) {
    //     this.trafficLayer = new AMap.TileLayer.Traffic({
    //       zIndex: 10
    //     })
    //     this.trafficLayer.setMap(config.Maps)
    //   }
    // },
    closeMouseTool () {
      // 移除测距、测面等
      setTimeout(() => {
        this.mouseTool.close()
        // this.mouseTool.close(true)
      }, 1)
      // this.ruleActive = false
      // this.areaActive = false
    }
  },
}
</script>

<style lang='scss' scoped>
.map-page {
  width: 100%;
  height: 100%;

  .map-wrapper {
    width: 100%;
    height: 100%;

    /deep/ .amap-logo {
      display: none !important;
      opacity: 0 !important;
      img {
        width: 0 !important;
        height: 0 !important;
      }
    }
    /deep/ .amap-copyright {
      display: none !important;
      opacity: 0 !important;
      height: 0 !important;
    }
  }

  .map-tools-top {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
</style>
