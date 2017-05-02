<template>
<span>
  <span v-if='errors' v-for='error in errors' >{{error}}</span>
</span>
</template>
<script type="text/javascript">
export default {
  name: 'FieldErrorMessage',
  props: {
    request: { required: true },
    field: { required: true, type: String }
  },
  computed: {
    errors () {
      let hasErrors = (this.request.status !== 200 && (this.request.result && this.request.result.data))
      if (hasErrors) {
        return this.request.result.data[this.field]
      }
      return false
    }
  }
}
</script>
