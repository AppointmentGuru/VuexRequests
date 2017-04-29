<template>
<div>
  <h2>AppointmentGuru</h2>
  <strong>Base URL:</strong> <code>{{api.baseURL}}</code>
  <h3>Setup:</h3>
  <pre v-highlightjs><code class="JavaScript">
import store from './store/plugin'
import AppointmentGuruBackend from './store/backends/appointmentguru'
let backends = [
  {
    name: 'appointmentguru',
    class: AppointmentGuruBackend
  },
  ..
]
Vue.use(store, backends)
  </code></pre>

  <h3>Endpoints:</h3>
  <div v-for='(data, name) in endpoints' >
    <h4>{{name}}: <code>{{data.method}} {{data.url}}</code></h4>
    <strong>Params:</strong>
    <pre v-highlightjs><code class="JSON">{{data.params}}</code></pre>
  </div>
  <h3>Resources:</h3>
  <el-collapse
    v-model="activeNames" >
    <el-collapse-item
      v-for='(url, resource) in resources' :key='url' :name="url">
      <template slot='title'>
        <strong>{{resource}}</strong>
        <code>{{url}}</code>
      </template>

      <h4>{{resource}}:</h4> <code>{{url}}</code>
      <pre v-highlightjs><code class="JavaScript">
// anonomous request (auto-assigned an id)
let resource = this.$appointmentguru.resource('{{resource}}')
// specify the id:
let namedRequest = this.$appointmentguru.resource('{{resource}}').id('some-id')

// GET {{url}}
let requestId = resource.list()

// GET {{url}}/:id
let requestId = resource.get(id)

// POST {{url}}/
let data = { .. }
let requestId = resource.create(data)

// PATCH {{url}}/:id
let data = { .. }
let requestId = resource.save(id, data)

// DELETE {{url}}/:id
let data = { .. }
let requestId = resource.delete(id, data)
      </code></pre>
    </el-collapse-item>
  </el-collapse>
</div>
</template>
<script type="text/javascript">
import AppointmentGuru from '@/store/backends/appointmentguru'

export default {
  name: 'AppointmentGuruDocs',
  mounted () {
    this.api = new AppointmentGuru()
    this.resources = this.api.resources()
    this.endpoints = this.api.endpoints()
  },
  data () {
    return {
      api: {},
      resources: [],
      endpoints: []
    }
  }
}
</script>
