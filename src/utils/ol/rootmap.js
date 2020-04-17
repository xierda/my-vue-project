import {Map, View} from 'ol'
import * as olControl from 'ol/control'

class RootMap {
  constructor (target, zoom = 7) {
    this.map = new Map({
      controls: olControl.defaults({
        zoom: false
      }),
      target,
      view: new View({
        center: [115.8, 28.7],
        projection: 'EPSG:4326',
        zoom
      })
    })
  }
}

export default RootMap
