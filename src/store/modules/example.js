const mapMode = {

  state: {
    inputSearchState: 'search',
    specialStateKey: '',
    specialSearchStateKey: 'tree',
    mapSearchForms: false,
    specialStateData: {},
    routeViewNode: {},
    routeDetailsData: {},
    routeAlongData: {},
    routeAlongDetailData: {},
    routeCountData: {},
    showPlotting: false,
    showRangeResult: false,
    showCountState: false
  },
  actions: {

  },
  mutations: {
    SET_ROUTE_NODE: (state, active) => {
      state.routeViewNode = active
    },
    SET_ROUTE_DETAILS_NODE: (state, active) => {
      state.routeDetailsData = active
    },
    SET_ALONG_NODE: (state, active) => {
      state.routeAlongData = active
    },
    SET_ALONG_DETAILS_NODE: (state, active) => {
      state.routeAlongDetailData = active
    },
    SET_COUNT_DATA: (state, active) => {
      state.routeCountData = active
    },
    SET_MAP_SPECIAL_STATE: (state, active) => {
      let {
        key,
        value
      } = active
      if (key) {
        state[key] = value
      }
    },
    SET_MAP_SPECIAL_DATA: (state, item) => {
      state.specialStateData = item
    }
  }
}
export default mapMode
