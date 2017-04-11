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

let VuexRequestMixin = {
  getResultKey (store, id, key, defaultResult) {
    let r = store.getters.getRequestById(id)
    if (r && r !== -1) { return r.result[key] }
    return defaultResult
  },
  getKey (store, id, key, defaultResult) {
    let r = store.getters.getRequestById(id)
    if (r && r !== -1) { return r[key] }
    return defaultResult
  }
}

export default {
  name: 'GithubCRUDPage',
  data () {
    return {
      token: 'ed0d68f4b3a1aea8b89bf76b38d82f7d66302513',
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
      return VuexRequestMixin.getResultKey(this.$requeststore, GET_REPOS, 'data', [])
    },
    reposChanged () {
      return VuexRequestMixin.getKey(this.$requeststore, GET_REPOS, 'modified', 0)
    },
    reposLoading () {
      return VuexRequestMixin.getKey(this.$requeststore, GET_REPOS, 'loading', false)
    }
  }
}
// curl -v -H "Authorization: token ed0d68f4b3a1aea8b89bf76b38d82f7d66302513" https://api.github.com/user/repos
</script>

