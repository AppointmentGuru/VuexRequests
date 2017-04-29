<template>
<div>
  <toc></toc>
  <hr/>
  <div v-html='parsedText' ></div>
</div>
</template>
<script>
import {GETTING_STARTED_TEXT} from '@/components/pages/content/gettingstarted'
import marked from 'marked'

import toc from '@/components/toc'

export default {
  GETTING_STARTED_TEXT,
  name: 'GettingStarted',
  components: {toc},
  computed: {
    parsedText () {
      return marked(GETTING_STARTED_TEXT)
    }
  }
}
</script>
