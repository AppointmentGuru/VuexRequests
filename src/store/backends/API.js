// import store from '../store'

class Resource {
  constructor (name, store, url, headers = {}) {
    this.name = name
    this.store = store
    this.url = url
    this.headers = headers
  }
  __getRequest (url, options) {
    // set up the basic request:
    let req = {url: url}
    if (this.id) { req.id = this.id }
    req.headers = this.headers

    // explicitly set options override all:
    Object.assign(req, options)
    return req
  }
  __detailUrl (id) {
    let url = this.url
    if (url.endsWith('/')) { // remove trailing slash
      url = url.substr(0, url.length - 1)
    }
    return `${url}/${id}/`
  }
  __addDefaultTags (req, action) {
    let tags = [`${this.name}-${action}`]
    if (!req.tags) { req.tags = [] }
    req.tags.push(tags)
  }
  id (id) {
    this.id = id
    return this
  }
  list (params = {}, tags = []) {
    let req = this.__getRequest(this.url, {params})
    this.__addDefaultTags(req, 'list')
    return this.store.dispatch('GET', req)
  }
  create (data, tags = []) {
    let req = this.__getRequest(this.url, {data, tags})
    this.__addDefaultTags(req, 'create')
    return this.store.dispatch('POST', req)
  }
  get (id, params = {}) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {params})
    this.__addDefaultTags(req, `get-${id}`)

    return this.store.dispatch('GET', req)
  }
  save (id, data, tags = [], params = {}) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {data, tags, params})
    this.__addDefaultTags(req, `save-${id}`)

    return this.store.dispatch('PATCH', req)
  }
  delete (id, params = {}, tags) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {params, tags})
    this.__addDefaultTags(req, `delete-${id}`)

    return this.store.dispatch('DELETE', req)
  }
  cancel (requestId) {}
  retry (requestId) {
    return this.store.dispatch('RETRY', requestId)
  }
}

export default class API {
  constructor (name, store, options = {}) {
    this.name = name
    this.store = store
    this.store.commit('BACKEND_CONFIG_INIT', name)
  }
  resource (resourceName) {
    let url = this.resources()[resourceName]
    if (this.baseUrl) { url = `${this.baseUrl}/${url}` }
    Object.assign(this.headers, this.store.getters.getBackendConfig(this.name).headers)
    return new Resource(resourceName, this.store, url, this.headers)
  }
  endpoint (name, options = {}) {
    let endpoint = this.endpoints()[name]
    let method = endpoint.method
    let url = endpoint.url
    if (this.baseUrl) { url = `${this.baseUrl}/${url}` }

    if (endpoint.requiresAuth) {
      Object.assign(this.headers, this.store.getters.getBackendConfig(this.name).headers)
    }
    let req = {
      url: url,
      method: method,
      headers: this.headers
    }
    Object.assign(req, options)
    return this.store.dispatch(method.toUpperCase(), req)
  }
  resources () {}
  endpoints () {}
}
