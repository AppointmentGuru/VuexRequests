<template>
<div class="container">
  <h1>CRUD example</h1>
  <blockquote>Create, edit and delete Github Repos</blockquote>
  <hr/>
  <div class='row' >
    <div class='col-md-12 '>
      <form class="m-md p-md" >
        <label for="inlineFormInput">Server response status:</label>
        <input v-model='token' type="text" class="form-control " >
        <button class='btn' @click='fetch' >Get Repos [{{reposLoading}}]</button>
      </form>
    </div>
  </div>
  <!-- /. row -->

  <div class='row'>
    <div class='col' >
      <ul class="list-group" >
        <a href="#" class="list-group-item active">
          Github Repos <span class='pull-right' >[{{reposChanged}}]</span>
        </a>
        <li
          v-for='repo in repos'
          @click='showRepo(repo)'
          class='list-group-item' >{{repo.full_name}}</li>
      </ul>
    </div>
    <div class='col' >
      <h3>Create a repo</h3>
      <form>
        <div class="form-group">
          <label for="repoName">Email address</label>
          <input v-model='repoName' class="form-control" id="repoName" placeholder="Repo name">
        </div>
        <button @click='createRepo' type="submit" class="btn btn-primary pull-right">Create Repo</button>
      </form>

      <div class='p-md' style='max-width:500px;' ><br/>
        <h3>Repo deets</h3>
        <div v-show='Object.keys(selectedRepo).length > 0' >
          <button @click='deleteRepo(selectedRepo)' class='btn btn-danger' >Delete Repo: {{selectedRepo.full_name}}</button>
          <pre v-highlightjs="JSON.stringify(selectedRepo, null, 2)" >
            <code class="JSON"></code></pre>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Mixins from '@/store/mixins'
const GET_REPOS = 'GET_REPOS'
const GET_REPO = 'GET_REPO'
const CREATE_REPO = 'CREATE_REPO'
const DELETE_REPO = 'DELETE_REPO'

const GITHUB_API = {
  get_repos (token) {
    return {
      id: GET_REPOS,
      url: 'https://api.github.com/user/repos',
      headers: {
        'Authorization': `token ${token}`
      },
      params: {
        sort: 'created',
        direction: 'desc'
      }
    }
  },
  get_repo (token, name) {
    return {
      id: GET_REPO,
      url: `https://api.github.com/user/repos/${name}`,
      headers: {
        'Authorization': `token ${token}`
      }
    }
  },
  create_repo (token, name) {
    return {
      id: CREATE_REPO,
      url: `https://api.github.com/user/repos`,
      headers: {
        'Authorization': `token ${token}`
      },
      data: {
        name: name
      }
    }
  },
  delete_repo (token, fullName) {
    return {
      id: DELETE_REPO,
      url: `https://api.github.com/repos/${fullName}`,
      headers: {
        'Authorization': `token ${token}`
      }
    }
  }
}

export default {
  name: 'GithubCRUDPage',
  mixins: [Mixins],
  data () {
    return {
      token: '',
      repoName: '',
      selectedRepo: {}
    }
  },
  methods: {
    fetch () {
      this.$requeststore.dispatch('GET', GITHUB_API.get_repos(this.token))
    },
    createRepo () {
      this.$requeststore.dispatch('POST', GITHUB_API.create_repo(this.token, this.repoName))
    },
    showRepo (repo) {
      this.selectedRepo = repo
    },
    deleteRepo (repo) {
      let result = window.confirm(`Are you sure you want to delete repo: ${repo.full_name}?`)
      if (result) {
        this.$requeststore.dispatch('DELETE', GITHUB_API.delete_repo(this.token, repo.full_name))
      }
    }
  },
  computed: {
    repos () {
      return this.getResultKey(GET_REPOS, 'data', [])
    },
    reposChanged () {
      return this.getResponseKey(GET_REPOS, 'modified', 0)
    },
    reposLoading () {
      return this.getResponseKey(GET_REPOS, 'loading', false)
    }
  }
}
</script>

