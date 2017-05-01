<style scoped >
.request-title{ text-overflow: ellipsis; }
</style>
<template>
<el-card class='compact' >
  <el-popover
    ref='popovermore'
    placement="bottom"
    width="200"
    trigger='click' >
    <el-button type='text' @click='emit("select", request)' >View</el-button><br/>
    <el-button type='text' @click='emit("retry", request.id)' >Retry</el-button><br/>
    <el-button type='text' @click='emit("cancel", request.id)'  >Cancel</el-button><br/>
  </el-popover>
  <el-button
    v-popover:popovermore class='pull-right'
    icon="more" size='small' type='text' ></el-button>
  <span class="badge badge-info ">
    <request-status-tag :request='request' ></request-status-tag>
  </span>
  <code class='request-title' v-if='request.url' >
    {{request.method.toUpperCase()}}
    {{ request.url.split('://')[1].split('/').splice(1).join('/').split('?')[0] }}
  </code>
  <!-- {{request.id}} -->
</el-card>
</template>
<script>
import RequestStatusTag from '@/components/RequestStatusTag'
export default {
  name: 'Request',
  components: {RequestStatusTag},
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
