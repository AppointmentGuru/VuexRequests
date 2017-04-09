# vuex-requests

> Make and manage HTTP requests with Vuex actions

## Getting started

**Install**

**Notes:**

* This is a Vue 2 module
* Depends on Vuex

**Setting up**

There are a couple of options for setting this up.

**1. Add the store as a plugin (recommended)**

...

**2. Add the store as a module to your existing Vuex store**

**Usage**

Making a request is as simple as:

```
let req = {
  url: url,
  id: 'get_random_users'
}
let id = this.$requeststore.dispatch('GET', req)
```

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
