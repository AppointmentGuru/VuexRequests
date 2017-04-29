// import axios from 'axios'
import API from './API'

export default class AppointmentGuruBackend extends API {
  constructor (options = {}) {
    super()
    this.baseUrl = process.env.APPOINTMENTGURU_API_ROOT
    let headers = { 'Content-Type': 'application/json' }
    if (options.token) { headers['Authorization'] = 'Token ' + options.token }
  }
  endpoints () { // endpoints are simple GET only requests
    return {
      'auth-identify': {
        url: 'api/auth/identify/',
        method: 'POST',
        params: { phone_number: { type: 'number', required: true } }
      }
    }
  }
  resources () { // resource endpoints support standard RESTful CRUD interface
    return {
      login: 'api/auth/login',
      practitioners: 'api/practitioners',
      'client.appointments': '/api/v2/client/appointments/',
      appointment: 'api/appointments', // v1: use for create
      appointments: 'api/v2/client/appointments' // v2: use for get
    }
  }
}
/*
practitioners: {
  name: 'Practitioners'
  description: '..'
  url: '/api/practitioners'
  requiredParams: [{}, ..] // copy props from Vue
  optionalParams: [{}, ..]
}

let http = axios.create({
  baseURL: process.env.APPOINTMENTGURU_API_ROOT,
  headers: headers
})
// setup interceptors:
http.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
*/
