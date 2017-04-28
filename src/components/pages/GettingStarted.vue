<template>
  <div v-html='parsedText' ></div>
</template>
<script>
import {GETTING_STARTED_TEXT} from '@/components/pages/content/gettingstarted'
import marked from 'marked'

export default {
  GETTING_STARTED_TEXT,
  name: 'GettingStarted',
  computed: {
    parsedText () {
      return marked(GETTING_STARTED_TEXT)
    }
  }
}
</script>
