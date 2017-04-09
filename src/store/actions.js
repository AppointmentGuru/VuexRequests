import axios from 'axios'

// application validations:
if (!process.env.API_ROOT) {
  console.warn('No API route defined. Please set API route in config/dev.env.js')
}

let http = axios.create({
  baseURL: process.env.API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  }
})

function id () {
  return Math.random().toString().split('.')[1]
}

/*
request can have: name, id, tags for lookup
e.g. name: get_widgets, or get_widget_{id}
e.g. id: 85689379875 (auto-assigned) Math.random()
e.g. tags: ['create_widget', 'widget_page', 'origin:some_place']
*/
function prepareRequest (method, request) {
  if (!request.id) { request.id = id() }
  request.result = { status: 0 }
  request.method = method
  request.loading = true
  return request
}
function makeRequest (commit, getters, request) {
  let isNewRequest = (getters.getRequestById(request.id) === -1)
  if (isNewRequest) { commit('PUSH_REQUEST', request) }
  return http[request.method](request.url)
    .then((result) => {
      request.loading = false
      request.result = result
      commit('UPDATE_REQUEST', request)
    })
    .catch((error) => {
      request.loading = false
      if (error.response) {
        request.result = error.response
      } else {
        request.result.message = error.message
        request.result.name = error.toString()
        request.result.config = error.config
      }

      if (!request.result.status) {
        request.result.status = 500
        request.result.statusText = error.toString()
      }
      commit('UPDATE_REQUEST', request)
    })
}

export const GET = ({ commit, getters }, request) => {
  request = prepareRequest('get', request)
  makeRequest(commit, getters, request)
  return request.id
}

export const POST = ({ commit, getters }, request) => {
  request = prepareRequest('post', request)
  commit('PUSH_REQUEST', request)
  return makeRequest(commit, getters, request)
}

export const PUT = ({ commit }) => {
  console.log('PUT')
}

export const PATCH = ({ commit }) => {
  console.log('PATCH')
}

export const DELETE = ({ commit }) => {
  console.log('DELETE')
}

export const RETRY = ({ getters, commit }, requestId) => {
  let request = getters.getRequestById(requestId)
  if (request !== -1) {
    request.result.status = 0  // retrying / in progress
    request.loading = true
    commit('UPDATE_REQUEST', request)
    return makeRequest(commit, getters, request)
  }
}

export const CANCEL = ({ commit }, requestId) => {
  console.log('cancel')
}
