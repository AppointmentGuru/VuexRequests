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
  if (request.result) {
    request.result.status = 0
  } else {
    request.result = { status: 0 }
  }
  request.method = method
  request.loading = true
  request.status = 0
  request.modified = new Date().getTime()
  return request
}
function makeRequest (commit, getters, request) {
  let isNewRequest = (getters.getRequestById(request.id) === -1)
  if (isNewRequest) {
    commit('PUSH_REQUEST', request)
  } else {
    commit('UPDATE_REQUEST', request)
  }

  let writeRequests = ['post', 'put', 'patch']
  let isWriteRequest = (writeRequests.indexOf(request.method) !== -1)
  let promise = null
  if (isWriteRequest) {
    promise = http[request.method](request.url, request.data, request)
  } else {
    promise = http[request.method](request.url, request)
  }

  return promise
    .then((result) => {
      request.modified = new Date().getTime()
      request.loading = false
      request.status = result.status
      request.result = result
      commit('UPDATE_REQUEST', request)
    })
    .catch((error) => {
      request.modified = new Date().getTime()
      request.loading = false
      request.status = 500
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
      } else {
        request.status = request.result.status
      }
      commit('UPDATE_REQUEST', request)
    })
}

export const GET = ({ commit, getters }, request) => {
  let originalRequest = getters.getRequestById(request.id)
  let originalRequestExists = (originalRequest !== -1)
  if (originalRequestExists) {
    request.result = originalRequest.result
  }

  request = prepareRequest('get', request)
  makeRequest(commit, getters, request)
  return request.id
}

export const POST = ({ commit, getters }, request) => {
  request = prepareRequest('post', request)
  makeRequest(commit, getters, request)
  return request.id
}

export const PUT = ({ commit, getters }, request) => {
  request = prepareRequest('put', request)
  makeRequest(commit, getters, request)
  return request.id
}

export const PATCH = ({ commit, getters }, request) => {
  request = prepareRequest('patch', request)
  makeRequest(commit, getters, request)
  return request.id
}

export const DELETE = ({ commit, getters }, request) => {
  request = prepareRequest('delete', request)
  makeRequest(commit, getters, request)
  return request.id
}

export const RETRY = ({ getters, commit }, requestId) => {
  let request = getters.getRequestById(requestId)
  if (request !== -1) {
    if (request.result.status > 0) { // only retry if not a request in progress
      request.result.status = 0  // retrying / in progress
      request.loading = true
      commit('UPDATE_REQUEST', request)
      makeRequest(commit, getters, request)
    }
  }
}

export const CANCEL = ({ commit }, requestId) => {
  console.log('cancel')
}
