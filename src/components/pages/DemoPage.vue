<template>
<div class="container-fluid">
  <div class='row' >
    <form class="form-inline p-2">
      <label for="inlineFormInput">Server response status:</label>
      <input v-model='resultCode' type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" >
      <button class='btn' @click='createRequest' >Create request</button>
    </form>
  </div>
  <div class='line' ></div>
  <el-row >
    <el-col :md='8' >

      <h5>In progress</h5>
      <template v-for='req in inprogressRequests' >
        <request-item :request='req' ></request-item>
        <button @click='retry(req.id)' >Cancel</button>
      </template>
    </el-col>
    <el-col :md='8' >
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

    </el-col>
    <el-col :md='8' >
      <h5>Success requests</h5>
      <request-item
        v-for='req in successRequests'
        :key='req.id'
        :request='req'
        @requestitem:retry='retry'
        @requestitem:select='showRequest' >
      </request-item>
    </el-col>
  </el-row>

  <el-dialog
    title='Request detail'
    size='large'
    :show-close='true'
    v-model='requestDetailIsVisible' >

      <request-detail :request='activeRequest' ></request-detail>

  </el-dialog>

</div>
</template>

<script>
import RequestItem from '../RequestItem'
import RequestDetail from '../RequestDetail'

export default {
  name: 'VuexRequests',
  components: {RequestItem, RequestDetail},
  data () {
    return {
      resultCode: 400,
      activeRequest: {},
      requestDetailIsVisible: false
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
      this.requestDetailIsVisible = true
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
