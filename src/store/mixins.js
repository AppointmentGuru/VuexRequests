export default {
  methods: {
    getRequestById (id) {
      if (id) {
        console.log(id)
        let state = this.$requeststore.state.requests
        if (id in state.index) {
          let index = state.index[id]
          return state.requests[index]
        }
      }
      return -1
    },
    getResultKey (id, key, defaultResult) {
      let r = this.getRequestById(id)
      if (r && r !== -1) { return r.result[key] }
      return defaultResult
    },
    getResponseKey (id, key, defaultResult) {
      let r = this.getRequestById(id)
      if (r && r !== -1) { return r[key] }
      return defaultResult
    }
  }
}
