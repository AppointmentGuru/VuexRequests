export const GETTING_STARTED_TEXT = `
# Getting started with VuexRequests

## Installation

## Setting up

\`\`\` JavaScript
import store from './store/plugin'
Vue.use(store)
\`\`\`

**Now you can use this in your components like such:**

\`\`\` JavaScript
let req = {url: 'http://something.com'}
this.$requeststore.dispatch('GET', req)
\`\`\`

## Making simple requests

### GET

### POST

### PUT

### PATCH

### DELETE

## Reactive response data in the store

**Examples:**

* Getting data from an API
* A CRUD example

## Using backends

> VuexRequests ships with a number of pre-build backends which you can use, or look at for examples

**Adding a backend to your configuration:**

In main.js:

\`\`\` JavaScript
import AppointmentGuruBackend from './store/backends/appointmentguru'
let backends = [{
  name: 'appointmentguru',
  class: AppointmentGuruBackend
}]
Vue.use(store, backends)
\`\`\`

**Using it in a component:**

\`\`\` JavaScript
// list appointments:
this.$appointmentguru.resource('appointment').list()

// get an appointment:
this.$appointmentguru.resource('appointments').get(id)

// create a new item:
let data = { .. }
let requestId = this.$appointmentguru.resource('appointments').create(data)

// update an appointment:
let requestId = \`appointment-\${id}-detail\`
this.$appointmentguru.resource('appointments').id(requestId).get(id)
let app = this.$requeststore.getters.getRequestById(requestId).data
app.title = 'something new'
this.$appointmentguru.resource('appointments').id(requestId).save(id, app)

\`\`\`

**Examples from before, but using backends:**

* Getting data from an API
* A CRUD example


## Writing your first backend

..
`
