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
      width : window.innerWidth,
      height : window.innerHeight,
      divStyle : 'width:' + window.innerWidth + 'px; height:' + (window.innerHeight-60) + 'px',
    }
  },
  mounted : function() {
    window.addEventListener('resize', this.resizeEvent);
  },
  beforeDestroy : function() {
    window.removeEventListener('resize', this.resizeEvent);
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
    },
    resizeEvent(event) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.divStyle = 'width:' + this.width + 'px; height:' + (this.height-60) + 'px;';
      this.$refs.multiview.resizeEvent(this.width, this.height);
      this.$refs.header.resizeEvent(this.width);
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
