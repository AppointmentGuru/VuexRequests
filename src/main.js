// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import store from './store/plugin'
Vue.config.productionTip = false

import AppointmentGuruBackend from './store/backends/appointmentguru'
import JSONPlaceholderBackend from './store/backends/jsonplaceholder'
let backends = [
  {
    name: 'appointmentguru',
    class: AppointmentGuruBackend
  },
  {
    name: 'jsonplaceholder',
    class: JSONPlaceholderBackend
  }
]
Vue.use(store, backends)

Vue.use(VueRouter)
Vue.use(ElementUI)

import routes from './routes'
const router = new VueRouter({ routes })

/* global hljs */
Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.textContent = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.textContent = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})

/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* new Vue({
  router,
  el: '#app',
  render: h => h(App)
}) */

new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
