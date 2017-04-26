<template>
<div>
	<h3>Backend example</h3>
  <button @click='fetch()'>Fetch appointments</button>
  <hr/>

  <h4>Request an endpoint</h4>

  <input v-model='phonenumber' />
  <button @click='validate' >Validate</button>
  <pre>{{identiyRequest}}</pre>
  <h5>Setup:</h5>
  <pre v-highlightjs><code class="JavaScript">
// in main:.js
import AppointmentGuruBackend from './store/backends/appointmentguru'
let backends = [{
  name: 'appointmentguru',
  class: AppointmentGuruBackend
}]
Vue.use(store, backends)
</code></pre>

<h5>Usage</h5>
<pre v-highlightjs><code class="JavaScript">
// then, in the component you can do:
// get
this.$appointmentguru.resource('get', 'appointments')

// post
let options = { data: { .. } }
this.$appointmentguru.resource('post', 'appointments', options)

// put

// patch

// delete

// retry

// cancel

</code></pre>
</div>
</template>
<script>
export default {
  name: 'BackendPage',
  data () {
    return {
      phonenumber: '+27',
      identityRequestId: 'identiy-request'
    }
  },
  computed: {
    requests () {
      return this.$requeststore.state.requests.requests
    },
    identiyRequest () {
      return this.$requeststore.getters.getRequestById(this.identityRequestId)
    }
  },
  methods: {
    fetch () {
      this.$appointmentguru.resource('get', 'client.appointments', {id: 'foo'})
    },
    validate () {
      let options = {
        params: {
          phone_number: this.phonenumber
        },
        id: this.identityRequestId
      }
      this.$appointmentguru.endpoint('post', 'auth-identify', options)
    }
  }
}
</script>
