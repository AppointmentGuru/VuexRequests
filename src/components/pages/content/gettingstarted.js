export const GETTING_STARTED_TEXT = `
# Getting started with VuexRequests

## Installation

\`\`\` JavaScript
npm install --save git+ssh://git@github.com/AppointmentGuru/VuexRequests
\`\`\`

## Setting up

### Add it as it's own store:

You can add VuexRequests as a standalone store. We provide a plugin which
sets up the store and makes it available on \`Vue.$requeststore\`

\`\`\` JavaScript
import store from 'vuex-requests/src/store/plugin'
Vue.use(store)
\`\`\`

**Now you can use this in your components like such:**

\`\`\` JavaScript
let req = {url: 'http://something.com'}
this.$requeststore.dispatch('GET', req)
\`\`\`


### Add it as a module

Alternatively you can simply add the requests module to your existing Vuex store:

In your store:

\`\`\` JavaScript
import requests from 'vuex-requests/src/store/modules/requests'

export default new Vuex.Store({
  modules: {
    ..
    requests: requests
  }
})
\`\`\`

**Note:** if you take this approach, you may need to set up your backends manually

## Create a backend

A backend is simply a class which provides any of: resources(), endpoints() and baseUrl.

Here is an example backend for [randomuser.me](http://randomuser.me):

\`\`\` JavaScript
import API from 'vuex-requests/src/store/backends/API'

export default class AppointmentGuruBackend extends API {
  constructor (options = {}) {
    super()
    // ideally you should use a config var for the api root:
    // this.baseUrl = process.env.APPOINTMENTGURU_API_ROOT
    this.baseUrl = 'https://randomuser.me'
  }
  resources () {
    return {
      randomuser: 'api'
    }
  }
}
\`\`\`

## Use your backend

### Add your backend to <code>Vue</code>

**main.js**

\`\`\` JavaScript
import RandomUserAPI from './mybackends/randomuser'
Vue.prototype.$randomuser = new RandomUserAPI()
\`\`\`

**Now, in your components you can use this like so:**

\`\`\` JavaScript
this.$randomuser.resource('randomuser').list()
\`\`\`

## Further examples:

* Making a simple request
* a CRUD example
* Reacting to status code change
* Dealing with errors

`
