<style scoped>
.response-data pre{
  max-height: 400px;
}
</style>
<template>
<div  class="card"  >
  <div class="card-block">
    <h4 class="card-title">
      #{{request.id}}
      <span class="badge badge-default pull-right">{{request.result.status}}</span></h4>
    <p class="card-text">
      <pre v-highlightjs><code class="Bash">{{ request.method.toUpperCase() }} {{request.url}}</code></pre>
    </p>

    <ul class="nav nav-tabs" id='reqResTabs' >
      <li class="nav-item">
        <a class="nav-link active" href="#request"> Request</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#response"> Response</a>
      </li>
    </ul>

    <div class="tab-content">

      <!-- request-->
      <div class="tab-pane fade active" id="request" role="tabpanel">
        <br/>
        <p>
        {{request.result.status}} {{request.result.statusText}}
        <h5>Headers</h5>
        <ul v-if='request.result.config' >
          <li v-for='(value, key, index) in request.result.config.headers' >
            <strong>{{key}}</strong>: {{value}}
          </li>
        </ul>
        </p>
      </div>

      <!-- response -->
      <div class="tab-pane fade" id="response" role="tabpanel">
        <p>
          <div v-show='request.result.name' >
            {{request.result.status}} {{request.result.statusText}}
          </div>

          <div v-show='request.result' >
            <h5>Headers</h5>
            <ul >
              <li v-for='(value, key, index) in request.result.headers' >
                <strong>{{key}}</strong>: {{value}}
              </li>
            </ul>
            <div class='response-data' v-show='request.result.data' >
              <h5>Response data</h5>
              <pre  v-highlightjs="JSON.stringify(request.result.data, null, 2)">
                <code class="JSON"></code></pre>
            </div>
          </div>
        </p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
/* global $ */

export default {
  name: 'RequestDetail',
  props: {
    request: { type: Object, required: true }
  },
  mounted () {
    $('#reqResTabs a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  }
}
</script>
