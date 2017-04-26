import axios from 'axios'
import API from './API'

export default class AppointmentGuruBackend extends API {
  constructor (options = {}) {
    super()
    let headers = { 'Content-Type': 'application/json' }
    if (options.token) { headers['Authorization'] = 'Token ' + options.token }
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
  }
  endpoints () { // endpoints are simple GET only requests
    return {
      'auth-identify': {
        url: 'api/auth/identify/',
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
