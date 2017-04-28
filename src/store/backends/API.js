import store from '../store'

class Resource {
  constructor (url) {
    this.url = url
  }
  get (id, params = {}) {
    let req = { url: `${this.url}/${id}`, params: params }
    return store.dispatch('GET', req)
  }
  list (params = {}) {
    let req = { url: this.url, params: params }
    return store.dispatch('GET', req)
  }
  save (data) {}
  update (data) {}
  cancel (requestId) {}
  retry (requestId) {}
}

export default class API {
  resource (resourceName) {
    let url = this.resources()[resourceName]
    return new Resource(url)
    /* let req = {
      url: this.resources()[resourceName],
      method: method
    }
    Object.assign(req, options)
    return store.dispatch(method.toUpperCase(), req) */
  }
  endpoint (method, name, options = {}) {
    // todo: throw warning if missing params
    let req = {
      url: this.endpoints()[name].url,
      method: method
    }
    Object.assign(req, options)
    return store.dispatch(method.toUpperCase(), req)
  }
  resources () {}
  endpoints () {}
}
