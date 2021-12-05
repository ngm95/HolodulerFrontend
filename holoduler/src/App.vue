<template>
  <div id="app">
    <div id="header">
      <main-header v-on:selected="drawIframe" />
    </div>
    <router-view ref="multiview"/> 
  </div>
  
</template>


<script>
import MainHeader from './components/Header.vue'
export default {
  name: 'Main',
  data () {
    return {
      
    }
  },
  components : {
    'main-header' : MainHeader
  },
  methods : {
    drawIframe(clicked, idx) {
      this.$refs.multiview.addIframe(clicked);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
