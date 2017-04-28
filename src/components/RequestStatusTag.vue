<template>
  <el-tag :type='statusColor' v-show='request !== -1' >{{text}}</el-tag>
</template>
<script type="text/javascript">
export default {
  name: 'RequestStatusTag',
  props: {
    request: { required: true },
    statusCodeMap: { type: Object, default: () => { return {} } }
  },
  computed: {
    statusColor () {
      if (this.request && this.request.result) {
        let status = this.request.result.status
        if (status.toString().startsWith('2')) {
          return 'success'
        }
        if (status.toString().startsWith('4')) {
          return 'warning'
        }
        if (status.toString().startsWith('5')) {
          return 'danger'
        }
        return 'default'
      }
    },
    text () {
      if (this.request && this.request.result) {
        let keys = Object.keys(this.statusCodeMap)
        let status = this.request.result.status
        if (keys.indexOf(status) !== -1) {
          return this.statusCodeMap[status]
        } else {
          return status
        }
      }
    }
  }
}
</script>
