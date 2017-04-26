import store from './store'

/* eslint-disable new-cap */
export default {
  store,
  install (Vue, options) {
    Vue.prototype.$requeststore = store
    console.log(options)
    for (let backend of options) {
      console.log(backend.name)
      Vue.prototype['$' + backend.name] = new backend['class']()
    }
  }
}
