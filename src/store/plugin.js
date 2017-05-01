import store from './store'

/* eslint-disable new-cap */
export default {
  store,
  install (Vue, options) {
    Vue.prototype.$requeststore = store
    for (let backend of options) {
      Vue.prototype['$' + backend.name] = new backend['class'](backend.name)
    }
  }
}
