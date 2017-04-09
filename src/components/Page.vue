<template>
<div class="container-fluid">
  <div class='row' >
    <form class="form-inline p-2">
      <label for="inlineFormInput">Server response status:</label>
      <input v-model='resultCode' type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" >
      <button class='btn' @click='createRequest' >Create request</button>
    </form>
  </div>
  <hr/>
  <div class="row">
    <div class="col">
      <h5>In progress</h5>
      <template v-for='req in inprogressRequests' >
        <request-item :request='req' ></request-item>
        <button @click='retry(req.id)' >Cancel</button>
      </template>
    </div>
    <div class="col">
      <h5>Error requests</h5>

      <strong>Client errors (4xx)</strong>
      <request-item
        v-for='req in clientErrorRequests'
        :key='req.id'
        :request='req'
        @requestitem:retry='retry'
      @requestitem:select='showRequest' >
      </request-item>


      <strong>Server errors (5xx)</strong>
      <request-item
        v-for='req in serverErrorRequests'
        :key='req.id'
        :request='req'
        @requestitem:retry='retry'
        @requestitem:select='showRequest' >
      </request-item>

    </div>

    <div class="col">
      <h5>Success requests</h5>
      <request-item
        v-for='req in successRequests'
        :key='req.id'
        :request='req'
        @requestitem:retry='retry'
        @requestitem:select='showRequest' >
      </request-item>
    </div>

  </div>

  <!--
  <div class='row'>
    <div class="col">
      <h3>Debug</h3>
      <h5>Index:</h5>
       <pre v-highlightjs><code class="JSON">{{index}}</code></pre>
      <ul>
        <li v-for='req in requests' >{{req.id}}</li>
      </ul>
      Loading: {{usersLoading}}
      <ul>
        <li v-for='user in users' >{{user.first}} {{user.last}}</li>
      </ul>
    </div>
  </div>
  -->

  <!-- detail modal -->
  <div id='req-modal' class="modal fade">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Request detail</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <request-detail :request='activeRequest' ></request-detail>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import RequestItem from './RequestItem'
import RequestDetail from './RequestDetail'
/* global $ */

export default {
  name: 'VuexRequests',
  components: {RequestItem, RequestDetail},
  data () {
    return {
      resultCode: 400,
      activeRequest: {}
    }
  },
  created () {
    let url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole'
    let req = {
      url: url,
      id: 'get_random_users'
    }
    this.$requeststore.dispatch('GET', req)
    this.activeRequest = req
  },
  computed: {
    requests () {
      return this.$requeststore.state.requests.requests
    },
    random_user_request () {
      let req = this.$requeststore.getters
                  .getRequestById('get_random_users')
      return req !== -1 ? req : {}
    },
    users () {
      let req = this.$requeststore.getters
                  .getRequestById('get_random_users')

      if (req !== -1) {
        return req.result.data
      } else {
        return []
      }
    },
    usersLoading () {
      let req = this.$requeststore.getters
                  .getRequestById('get_random_users')
      return req !== -1 ? req.loading : false
    },
    index () {
      return this.$requeststore.state.requests.index
    },
    requestCount () {
      return this.$requeststore.getters.totalRequestCount
    },
    inprogressRequests () {
      return this.$requeststore.getters.getInProgressRequests
    },
    successRequests () {
      return this.$requeststore.getters.getRequestByStatusCode(200)
    },
    clientErrorRequests () {
      return this.$requeststore.getters.getClientErrorRequests
    },
    serverErrorRequests () {
      return this.$requeststore.getters.getServerErrorRequests
    }
  },
  methods: {
    createRequest () {
      let request = { url: 'api/' }
      return this.$requeststore.dispatch('GET', request)
    },
    retry (id) {
      return this.$requeststore.dispatch('RETRY', id)
    },
    showRequest (req) {
      this.activeRequest = req
      $('#req-modal').modal('show')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
