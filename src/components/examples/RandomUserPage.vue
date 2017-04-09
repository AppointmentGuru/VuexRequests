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
export default {
  name: 'RandomUserPage',
  mounted () {
    let req = {
      url: 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb',
      id: GET_USERS_REQUEST
    }
    this.$requeststore.dispatch('GET', req)
  },
  computed: {
    randomUserRequest () {
      let req = this.$requeststore
                  .getters
                    .getRequestById(GET_USERS_REQUEST)
      if (req !== -1) {
        return req
      } else {
        return { data: { results: [] } }
      }
    },
    users () {
      return this.randomUserRequest.result
    },
    usersLoading () {
      return this.randomUserRequest.loading
    }
  },
  methods: {
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

export default {
  name: 'RandomUserPage',
  mounted () {
    let req = {
      url: 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb',
      id: GET_USERS_REQUEST
    }
    this.$requeststore.dispatch('GET', req)
  },
  computed: {
    randomUserRequest () {
      let req = this.$requeststore
                  .getters
                    .getRequestById(GET_USERS_REQUEST)
      if (req !== -1) {
        return req
      } else {
        return { result: { data: { results: [] } } }
      }
    },
    users () {
      if (this.randomUserRequest) {
        return this.randomUserRequest.result.data.results[0]
      }
      return []
    },
    usersLoading () {
      if (this.randomUserRequest) {
        return this.randomUserRequest.loading
      }
      return false
    }
  },
  methods: {
    retry () {
      this.$requeststore.dispatch('RETRY', GET_USERS_REQUEST)
    }
  }
}
</script>
