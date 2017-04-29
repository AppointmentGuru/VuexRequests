import API from './API'

export default class JSONPlaceholderBackend extends API {
  constructor (options = {}) {
    super()
    this.baseUrl = 'https://jsonplaceholder.typicode.com'
  }
  resources () {
    return {
      posts: 'posts/',
      comments: 'comments/',
      albums: 'albums/',
      photos: 'photos/',
      todos: 'todos/',
      users: 'users/'
    }
  }
}
