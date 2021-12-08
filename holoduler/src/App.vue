<template>
  <div id="app">
    <div id="header">
      <main-header ref="header" v-on:selected="drawIframe" />
    </div>
    <router-view ref="multiview" v-on:deleted="refreshProfile" /> 
  </div>
  
</template>


<script>
import MainHeader from './components/include/Header'
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
    },
    refreshProfile(videoId) {
      this.$refs.header.deletePlaying(videoId);
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
