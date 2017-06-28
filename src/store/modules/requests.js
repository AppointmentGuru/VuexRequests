import Vue from 'vue'
import { GET, POST, PUT, PATCH, DELETE, RETRY } from '../actions'
import {
  BACKEND_CONFIG_INIT,
  BACKEND_CONFIG_SET_HEADERS,
  BACKEND_CONFIG_REMOVE_HEADER,
  BACKEND_CONFIG_SET_HEADER,
  UPDATE_REQUEST,
  PUSH_REQUEST,
  REMOVE_REQUEST
} from '../mutations'
/*
 if there's an error:
 500 -> retry
 400 -> edit and retry
 */

export default {
  state: {
    config: {
      backends: {}
    },
    requests: [],
    index: {}
  },
  mutations: {
    [BACKEND_CONFIG_INIT] (state, backendName) {
      let config = {
        headers: {}
      }
      Vue.set(state.config.backends, backendName, config)
    },
    [BACKEND_CONFIG_SET_HEADERS] (state, backendHeaders) {
       // [backendName, headers]
      let backend = backendHeaders[0]
      let headers = backendHeaders[1]
      Vue.set(state.config.backends[backend], 'headers', headers)
    },
    [BACKEND_CONFIG_REMOVE_HEADER] (state, backendKey) {
      // usage: commit('BACKEND_CONFIG_REMOVE_HEADER', ['appointmentguru','Authorization'])
      // [backend, key]
      let backend = backendKey[0]
      let key = backendKey[1]
      let headers = state.config.backends[backend].headers
      Vue.delete(headers, key)
    },
    [BACKEND_CONFIG_SET_HEADER] (state, backendKeyValue) {
      // [backend, key, value]
      let backend = backendKeyValue[0]
      let key = backendKeyValue[1]
      let value = backendKeyValue[2]
      let headers = state.config.backends[backend].headers
      Vue.set(headers, key, value)
    },
    [UPDATE_REQUEST] (state, request) {
      let index = state.index[request.id]
      Vue.set(state.requests, index, request)
    },
    [PUSH_REQUEST] (state, request) {
      state.requests.push(request)
      let index = (state.requests.length - 1)
      Vue.set(state.index, request.id, index)
      // state.index[request.id] = (state.requests.length - 1)
    },
    [REMOVE_REQUEST] (state, requestId) {
      console.log(`remove request: ${requestId}`)
    }
  },
  actions: {
    GET, POST, PUT, PATCH, DELETE, RETRY
  },
  getters: {
    getBackendConfig: (state) => (backendName) => {
      return state.config.backends[backendName] || {}
    },
    getRequestById: (state, getters) => (id) => {
      if (id in state.index) {
        let index = state.index[id]
        return state.requests[index]
      } else {
        return -1
      }
    },
    getRequestsByTag: (state, getters) => (tag) => {
      return state.requests.filter((req) => {
        return (req.tags && req.tags.indexOf(tag) !== -1)
      })
    },
    totalRequestCount: (state) => {
      return Object.keys(state.requests).length
    },
    getRequestByStatusCode: (state, getters) => (code) => {
      return state.requests.filter((req) => {
        return (req.result.status === code)
      })
    },
    // nxx
    getRequestByStatusClass: (state, getters) => (code) => {
      return state.requests.filter((req) => {
        if (req.result && req.result.status) {
          return (req.result.status.toString().indexOf(code) === 0)
        }
      })
    },
    getInProgressRequests: (state, getters) => {
      return getters.getRequestByStatusCode(0)
    },
    // 4xx responses:
    getClientErrorRequests: (state, getters) => {
      return getters.getRequestByStatusClass('4')
    },
    // 5xx responses:
    getServerErrorRequests: (state, getters) => {
      return getters.getRequestByStatusClass('5')
    }
  }
}
