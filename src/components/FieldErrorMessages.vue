<template>
<div >
  <div :class='errorClass + "-container"' v-if='errors'  >
    <div v-for='error in errors' :class='errorClass'  >
      {{error}}
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'FieldErrorMessage',
  props: {
    request: { required: true },
    field: { required: true, type: String },
    errorClass: { type: String, default: 'error' }
  },
  computed: {
    errors () {
      let hasErrors = (
        this.request.status !== 200 && (this.request.result && this.request.result.data))
      if (hasErrors) {
        return this.request.result.data[this.field]
      }
      return false
    }
  }
}
</script>
