<template>
	<ul class='toc'>
    <li
      v-for = 'item in toc'
      :class='item.size' >
      <a href='#' v-scroll-to="'#'+item.target" >
        {{item.text}}
      </a>
    </li>
  </ul>
</template>
<script type="text/javascript">
export default {
  name: 'toc',
  mounted () {
    let headers = document.querySelectorAll('h1,h2,h3')
    for (let header of headers) {
      let item = {
        size: header.tagName,
        target: header.id,
        text: header.innerText.trim()
      }
      this.toc.push(item)
    }
  },
  data () {
    return {
      toc: []
    }
  }
}
</script>
<style>
.H1 a, .H2 a, .H3 a { text-decoration: none; }
.H1 {
  font-weight: bold;
  text-transform: uppercase; }
.H2 { margin-left: 10px; }
.H3 { margin-left: 20px; }
</style>
