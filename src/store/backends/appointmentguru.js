// import axios from 'axios'
import API from './API'

export default class AppointmentGuruBackend extends API {
  constructor (name = 'appointmentguru', store, options = {}) {
    super(name, store)
    this.store = store
    this.baseUrl = process.env.APPOINTMENTGURU_API_ROOT
    console.log(this.baseUrl)
    this.headers = { 'Content-Type': 'application/json' }
  }
  endpoints () { // endpoints are simple GET only requests
    return {
      'auth-identify': {
        url: 'api/auth/identify/',
        method: 'POST',
        params: { phone_number: { type: 'number', required: true } }
      },
      'auth-validate-otp': {
        url: 'api/auth/otp/',
        method: 'POST',
        params: {
          phone_number: { type: 'number', required: true },
          otp: { type: 'number', required: true }
        }
      },
      'auth-forgot-password': {
        url: 'api/auth/forgot-password/',
        method: 'POST',
        requiresAuth: false,
        params: {
          phone_number: { type: 'number', required: true }
        }
      },
      'auth-set-password': {
        url: 'api/auth/set-password/',
        method: 'POST',
        requiresAuth: true,
        params: {
          phone_number: { type: 'number', required: true },
          otp: { type: 'number', required: true }
        }
      },
      'auth-login-phone': {
        url: 'api/auth/phone/token/',
        method: 'POST',
        params: {
          phone_number: { type: 'number', required: true },
          password: { type: 'string', required: true }
        }
      },
      'auth-register': {
        url: 'api/auth/register/',
        method: 'POST',
        params: {
          full_name: { type: 'strong', required: true },
          email: { type: 'email', required: true },
          phone_number: { type: 'number', required: true },
          password1: { type: 'string', required: true },
          password2: { type: 'string', required: true }
        }
      },
      'me': {
        url: 'api/users/me/',
        method: 'PATCH',
        params: {}
      }
    }
  }
  resources () { // resource endpoints support standard RESTful CRUD interface
    return {
      login: 'api/auth/login',
      'users': 'api/users/',
      'client.practitioners': 'api/client/practitioners/',
      'client.appointments': 'api/client/appointments/',
      'client.v2.appointments': 'api/v2/client/appointments/',
      appointment: 'api/appointments/', // v1: use for create
      appointments: 'api/v2/client/appointments/', // v2: use for get
      'practitioner.appointments.clashes': '/api/appointments/clashes/',
      'practitioner.me': 'api/v2/practitioner/me/',
      'practitioner.me.profile': 'api/v2/practitioner/me/profile/',
      'practitioner.appointments': 'api/appointments/',
      'practitioner.clients': 'api/v2/practitioner/clients/'
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
