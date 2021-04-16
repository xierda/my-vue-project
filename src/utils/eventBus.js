class EventBus {
  es = {}
  /* 绑定事件 */
  on(eventName, cb) {
    if (!this.es[eventName]) {
      this.es[eventName] = []
    }
    this.es[eventName].push({
      cb
    })
  }
  /* 触发事件 */
  emit(eventName, ...params) {
    const listeners = this.es[eventName] || []
    let l = listeners.length

    for (let i = 0; i < l; i++) {
      const {
        cb
      } = listeners[i]
      cb.apply(this, params)
    }
  }
}

export default new EventBus()