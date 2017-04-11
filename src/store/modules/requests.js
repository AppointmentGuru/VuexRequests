import Vue from 'vue'
import { GET, POST, PUT, PATCH, DELETE, RETRY } from '../actions'
/* eslint-disable no-useless-computed-key */
export default {
  state: {
    requests: [],
    index: {}
  },
  mutations: {
    ['UPDATE_REQUEST'] (state, request) {
      let index = state.index[request.id]
      Vue.set(state.requests, index, request)
    },
    ['PUSH_REQUEST'] (state, request) {
      state.requests.push(request)
      let index = (state.requests.length - 1)
      Vue.set(state.index, request.id, index)
      // state.index[request.id] = (state.requests.length - 1)
    },
    ['REMOVE_REQUEST'] (state, requestId) {
      console.log(`remove request: ${requestId}`)
    }
  },
  actions: {
    GET, POST, PUT, PATCH, DELETE, RETRY
  },
  getters: {
    getRequestById: (state, getters) => (id) => {
      if (id in state.index) {
        let index = state.index[id]
        return state.requests[index]
      } else {
        return -1
      }
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
