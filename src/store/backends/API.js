import store from '../store'

class Resource {

  constructor (url) {
    this.url = url
  }

  get (id) {}
  list (params={}) {}
  save (data) {}
  update (data) {}
  cancel () {}
  retry () {}
}

export default class API {
  resource (method, resourceName, options = {}) {
    // let url = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb'
    let req = {
      url: this.resources()[resourceName],
      method: method
    }
    Object.assign(req, options)
    return store.dispatch(method.toUpperCase(), req)
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
