<template>
<div>
  <h1>Random User Example</h1>
  <blockquote>An example that demonstrates using VuexRequests to interact with the RandomUser.io API</blockquote>
  <hr/>
  <div class='row' >
    <div class='col' >
      <ul class="list-group" >
        <li class='list-group-item' >
          <button @click=retry class='btn' >Reload</button>
          Loading: {{usersLoading}}
        </li>
        <li
          v-for='user in users'
          class='list-group-item' >
            {{user.first}} {{user.last}}</li>
      </ul>
    </div>
    <div class='col' >
      <div class='p-2' >
        <h3>Code for this example:</h3>

<pre v-highlightjs><code class="JavaScript">
const GET_USERS_REQUEST = 'get_users_request'

export default {
  name: 'RandomUserPage',
  mounted () {
    this.fetch()
  },
  computed: {
    request () {
      let req = this.$requeststore.getters.getRequestById(GET_USERS_REQUEST)
      let requestExists = (req !== -1)
      if (requestExists) {
        return req
      } else { // if no request exists. return a blank mock
        return { result: { data: { results: [[]] } } }
      }
    },
    users () {
      if (this.request) { return this.request.result.data.results[0] }
      return []
    },
    usersLoading () {
      if (this.request) { return this.request.loading }
      return false
    }
  },
  methods: {
    fetch () {
      let url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb'
      let req = { url: url, id: GET_USERS_REQUEST }
      this.$requeststore.dispatch('GET', req)
    },
    retry () {
      this.$requeststore.dispatch('RETRY', GET_USERS_REQUEST)
    }
  }
}
</code></pre>
      </div>
    </div>
  </div>
</div>
</template>
<script>
const GET_USERS_REQUEST = 'get_users_request'
import Mixins from '@/store/mixins'

export default {
  name: 'RandomUserPage',
  mixins: [Mixins],
  mounted () {
    this.fetch()
  },
  computed: {
    request () {
      let req = this.getRequestById(GET_USERS_REQUEST)
      let requestExists = (req !== -1)
      if (requestExists) {
        return req
      } else { // if no request exists. return a blank mock
        return { result: { data: { results: [[]] } } }
      }
    },
    users () {
      try {
        if (this.request) { return this.request.result.data.results[0] }
      } catch (err) {
        console.log(err)
      }
      return []
    },
    usersLoading () {
      if (this.request) { return this.request.loading }
      return false
    }
  },
  methods: {
    fetch () {
      let url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb'
      let req = { url: url, id: GET_USERS_REQUEST }
      this.$requeststore.dispatch('GET', req)
    },
    retry () {
      this.$requeststore.dispatch('RETRY', GET_USERS_REQUEST)
    }
  }
}
</script>
