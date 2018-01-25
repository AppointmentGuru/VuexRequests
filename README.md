# vuex-requests

> Make and manage HTTP requests with Vuex actions

## Getting started

**Install**

```
nom install --save http://components.appointmentguru.co/vuex-requests/vuex-requests-1.0.0.tgz
```

**Setup**

**Setup your vuex store**

in main.js:

```
// import store:
import store from './store'
...

// inject it into your app:
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

Now you can access `this.$store` in your app

**Add to the requests module to your vuex store**

in store `store/index.js`:

```
import Vue from 'vue'
import Vuex from 'vuex'
import requests from 'vuex-requests/src/store/modules/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    requests: requests
  }
})

```

**Setup your backends:**

We'll setup the `randomuser.me` API as a backend:

Create a mixin: `mixins/api.js`

```
import API from 'vuex-requests/src/store/backends/API'

export default {
  name: 'APIMixin',
  data () {
    return {
	}
  }
}
```

You'll need this .. don't worry too much about what it does:

```
  ...
  methods: {
    getAPI (name) {
      let api = new API(name, this.$store)
      api.baseUrl = process.env[`${name.toUpperCase()}_URL`]
      api.headers = { 'Content-Type': 'application/json' }
      api.resources = () => { return this[name].resources }
      return api
    }
  }
  ...
```

Now, we configure our API:

```
  data () {
    return {
      randomuserservice: {
        resources: {
          users: 'api/'
        }
      }
    }
  },
```

The resources lookup is a key value of a lookup (`users`), and a path endpoint: `api/`

Finally, we make it available to our components: 

```
  computed: {
    $randomuserservice () {
      return this.getAPI('randomuserservice')
    }
  }
```

Now you can make requests like so: 

```
// GET /users/
this.$randomuserservice.resource('users').id('user-request').list()
// GET /users/:id
this.$randomuserservice.resource('users').id('user-request').list(id)
// POST /users/
this.$randomuserservice.resource('users').id('user-request').create(data)
// PATCH /users/
this.$randomuserservice.resource('users').id('user-request').save(id, data)
```

**Final version of mixins/api:**

```
import API from 'vuex-requests/src/store/backends/API'

export default {
  name: 'APIMixin',
  data () {
    return {
      randomuserservice: {
        resources: {
          users: 'api/'
        }
      }
    }
  },
  methods: {
    getAPI (name) {
      let api = new API(name, this.$store)
      api.baseUrl = process.env[`${name.toUpperCase()}_URL`]
      api.headers = { 'Content-Type': 'application/json' }
      api.resources = () => { return this[name].resources }
      return api
    }
  },
  computed: {
    $randomuserservice () {
      return this.getAPI('randomuserservice')
    }
  }
}

```

Add the mixin globally: 

in `main.js`


```
import APIMixin from './mixins/api'

...
Vue.mixin(APIMixin)
```

### An example:

```

```

**Notes:**

* This is a Vue 2 module
* Depends on Vuex

**Setting up**


## Develop / contribute

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
