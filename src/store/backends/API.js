import store from '../store'

class Resource {
  constructor (url) {
    this.url = url
  }
  __getRequest (url, options) {
    let req = {url: url}
    if (this.id) { req.id = this.id }
    Object.assign(req, options)
    return req
  }
  __detailUrl (id) {
    return `${this.url}/${id}`
  }
  id (id) {
    this.id = id
    return this
  }
  list (params = {}) {
    let req = this.__getRequest(this.url, {params})
    return store.dispatch('GET', req)
  }
  create (data, tags = []) {
    let req = this.__getRequest(this.url, {data, tags})
    return store.dispatch('POST', req)
  }
  get (id, params = {}) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {params})
    return store.dispatch('GET', req)
  }
  save (id, data, tags = []) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {data, tags})
    return store.dispatch('PATCH', req)
  }
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
    if (this.id) { req.id = this.id }
    Object.assign(req, options)
    return store.dispatch(method.toUpperCase(), req)
  }
  resources () {}
  endpoints () {}
}
