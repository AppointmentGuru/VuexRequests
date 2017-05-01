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

http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // let isNotAuthenticated = error.response.status === 401
    console.log(error.response.status)
    return Promise.reject(error)
  })

const RESOURCES = {
  login: 'api/auth/login',
  practitioners: 'api/practitioners',
  appointment: 'api/appointments', // v1: use for create
  appointments: 'api/v2/client/appointments' // v2: use for get
}

export const API = {
  axios: http,
  getUrl (url) {
    return http.get(url)
  },
  get (resource, id) {
    let url = `${RESOURCES[resource]}/`
    if (id) {
      url = `${url}${id}/`
    }
    return http.get(url)
  },
  update (resource, id, data) {
    let url = `${RESOURCES[resource]}/${id}/`
    return http.patch(url, data)
  },
  create (resource, data, extraPath) {
    let url = `${RESOURCES[resource]}/`
    if (extraPath) {
      url = `${url}${extraPath}`
    }
    return http.post(url, data)
  },
  delete (resource, id) {
    let url = `${RESOURCES[resource]}/${id}/`
    return http.delete(url)
  },
  login (data, asPractitioner) {
    let url = 'api/auth/login/'
    if (asPractitioner) {
      data['scope'] = 'practitioner'
    }
    return http.post(url, data)
  }
}
