import GettingStarted from './components/pages/GettingStarted'
import BackendsPage from './components/pages/backends/BackendsPage'
import DemoPage from './components/pages/DemoPage'
import DocsPage from './components/pages/DocsPage'
import RandomUserPage from './components/pages/examples/RandomUserPage'
import GithubCRUDPage from './components/pages/examples/GithubCRUDPage'
import BlogPage from './components/pages/backends/examples/BlogPage'
import ConfigExamplePage from './components/pages/backends/examples/ConfigExamplePage'
import AppointmentGuruDocs from './components/pages/backends/docs/AppointmentGuruDocs'

export default [
  { path: '/', component: GettingStarted, name: 'Getting Started' },
  { path: '/docs', component: DocsPage, name: 'Documentation' },
  { path: '/examples',
    component: BackendsPage,
    name: 'Examples',
    children: [
      { path: 'demo', component: DemoPage, name: 'Demo' },
      { path: 'randomuser', component: RandomUserPage, name: 'RandomUser' },
      { path: 'github', component: GithubCRUDPage, name: 'CRUD' }
    ]
  },
  { path: '/backends',
    component: BackendsPage,
    name: 'Backends',
    children: [
      { type: 'divider', path: '/', name: 'Usage' },
      { path: 'examples/blog', component: BlogPage, name: 'Blog' },
      { path: 'examples/config', component: ConfigExamplePage, name: 'Config' },
      { type: 'divider', path: '/', name: 'Available backends' },
      { path: 'docs/appointmentguru', component: AppointmentGuruDocs, name: 'AppointmentGuru' }
    ]
  }
]
