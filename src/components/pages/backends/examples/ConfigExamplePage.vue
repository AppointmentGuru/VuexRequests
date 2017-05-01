<template>
<div>
  <h2>An example with backend configs</h2>
  <el-card >
    <el-form>
      <h3>Headers</h3>
      <el-row v-for='header in headers' :key='header.key' >
        <el-col :md='12' >
          <el-form-item label='Key' >
            <el-input v-model='header.key' ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md='12' >
          <el-form-item label='Value' >
            <el-input v-model='header.value' ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button @click='addHeader' type='text' >+ Add a header</el-button>
      <el-button @click='setHeaders' type='primary' >Update headers</el-button>
    </el-form>
  </el-card>
  <hr/>
  <strong><code>requests.config.backends.appointmentguru</code></strong>
  <pre>{{config}}</pre>
  <div>
    <el-button @click='makeRequest' type='primary' class='pull-right' >Make request</el-button>
    <div class='clearfix' ></div>
  </div>

  <div v-if='request !== -1' >
    <h5>Request</h5>
    <div>
      <i v-show='request.loading' class="el-icon-loading"></i>
      <code>{{request.method.toUpperCase()}} {{request.url}}</code>
      <request-status-tag :request='request' ></request-status-tag>
    </div>
    <div v-if='request.result.config' >
      <strong><code>sent with headers:</code></strong>
      <pre>{{request.result.config.headers}}</pre>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import RequestStatusTag from '@/components/RequestStatusTag'

const EXAMPLE_REQUEST_ID = 'config-example-request'

export default {
  EXAMPLE_REQUEST_ID,
  name: 'ConfigExamplePage',
  components: {RequestStatusTag},
  data () {
    return {
      headers: [{key: 'Content-Type', value: 'application/json'}]
    }
  },
  methods: {
    makeRequest () {
      this.$appointmentguru
        .resource('practitioner.me')
        .id(EXAMPLE_REQUEST_ID)
        .list()
    },
    addHeader () {
      this.headers.push({key: '', value: ''})
    },
    setHeaders () {
      let newHeaders = {}
      this.headers.forEach((header) => {
        newHeaders[header.key] = header.value
      })
      let data = [this.$appointmentguru.name, newHeaders]
      this.$requeststore.commit('BACKEND_CONFIG_SET_HEADERS', data)
    }
  },
  computed: {
    config () {
      return this.$requeststore.getters.getBackendConfig(this.$appointmentguru.name)
    },
    request () {
      return this.$requeststore.getters.getRequestById(EXAMPLE_REQUEST_ID)
    }
  }
}
</script>
