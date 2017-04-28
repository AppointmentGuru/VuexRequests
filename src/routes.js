import GettingStarted from './components/pages/GettingStarted'
import DemoPage from './components/pages/DemoPage'
import RandomUserPage from './components/pages/examples/RandomUserPage'
import GithubCRUDPage from './components/pages/examples/GithubCRUDPage'
import BackendPage from './components/pages/examples/BackendPage'
import BlogPage from './components/pages/examples/BlogPage'

export default [
  { path: '/', component: GettingStarted, name: 'Getting Started' },
  { path: '/demo', component: DemoPage, name: 'Demo' },
  { path: '/randomuser', component: RandomUserPage, name: 'RandomUser' },
  { path: '/github', component: GithubCRUDPage, name: 'CRUD' },
  { path: '/backendexample', component: BackendPage, name: 'Backends' },
  { path: '/blogpage', component: BlogPage, name: 'Backend: Blog page example' }
]
