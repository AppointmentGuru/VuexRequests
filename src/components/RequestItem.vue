<template>
<div class="card">
  <div class="card-block">
    <span class="badge badge-info ">
      {{request.result.status}}
    </span>{{request.id}}
    <hr/>
    <a @click='emit("select", request)' class="card-link">View</a>
    <a @click='emit("retry", request.id)' class="card-link">Retry</a>
    <a @click='emit("cancel", request.id)'  class="card-link">Cancel</a>
  </div>
</div>
</template>
<script>
export default {
  name: 'Request',
  props: {
    request: { type: Object, required: true }
  },
  methods: {
    emit (name, id) {
      let evt = `requestitem:${name}`
      console.log(evt, id)
      this.$emit(evt, id)
    }
  }
}
</script>
