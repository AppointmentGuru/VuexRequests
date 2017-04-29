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


## Use your backend

## Patterns:

### Making a simple request

...

### Re-using a create request

...

### Reacting to a change in status code

...


`
