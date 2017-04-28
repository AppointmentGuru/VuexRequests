import API from './API'

export default class JSONPlaceholderBackend extends API {
  constructor (options = {}) {
    super()
  }
  resources () {
    return {
      posts: 'https://jsonplaceholder.typicode.com/posts/',
      comments: 'comments/',
      albums: 'albums/',
      photos: 'photos/',
      todos: 'todos/',
      users: 'users/'
    }
  }
}
