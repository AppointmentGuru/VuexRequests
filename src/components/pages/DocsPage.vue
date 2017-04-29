<template>
<div>
  <toc></toc>
	<h1>Documentation</h1>
  <h2>Structure</h2>
  <pre v-highlightjs><code class="JSON">{{state}}</code></pre>

  <h2>Mutations</h2>
  <ul>
    <li v-for='(func, mutation) in mutations' >{{mutation}}</li>
  </ul>

  <h2>Actions</h2>
  <ul>
    <li v-for='(func, action) in actions' >{{action}}</li>
  </ul>

  <h2>Getters</h2>
  <ul>
    <li v-for='(func, getter) in getters' >{{getter}}</li>
  </ul>
</div>
</template>
<script type="text/javascript">
import toc from '@/components/toc'
import vuexrequests from '@/store/modules/requests'

export default {
  vuexrequests,
  name: 'DocsPage',
  components: {toc},
  data () {
    return {
      state: vuexrequests.state,
      mutations: vuexrequests.mutations,
      actions: vuexrequests.actions,
      getters: vuexrequests.getters
    }
  }
}
</script>
