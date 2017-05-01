import store from '../store'

class Resource {
  constructor (name, url, headers = {}) {
    this.name = name
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
    return `${this.url}/${id}`
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
    return store.dispatch('GET', req)
  }
  create (data, tags = []) {
    let req = this.__getRequest(this.url, {data, tags})
    this.__addDefaultTags(req, 'create')
    return store.dispatch('POST', req)
  }
  get (id, params = {}) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {params})
    this.__addDefaultTags(req, `get-${id}`)

    return store.dispatch('GET', req)
  }
  save (id, data, tags = []) {
    let url = this.__detailUrl(id)
    let req = this.__getRequest(url, {data, tags})
    this.__addDefaultTags(req, `save-${id}`)

    return store.dispatch('PATCH', req)
  }
  cancel (requestId) {}
  retry (requestId) {
    return store.dispatch('RETRY', requestId)
  }
}

export default class API {
  constructor (name, options = {}) {
    this.name = name
    store.commit('BACKEND_CONFIG_INIT', name)
  }
  resource (resourceName) {
    let url = this.resources()[resourceName]
    if (this.baseUrl) { url = `${this.baseUrl}/${url}` }

    Object.assign(this.headers, store.getters.getBackendConfig(this.name).headers)

    return new Resource(resourceName, url, this.headers)
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
