<template>
	<div id="schedule" v-bind:style="'width:' + width + 'px; background-color:#f1f1f1; padding-top:10px'">
		<liveSchedule/>
		<upcomingSchedule/>
		<completedSchedule/>
	</div>
</template>

<script>
import axios from 'axios';
import Live from './Live.vue'
import Upcoming from './Upcoming.vue'
import Completed from './Completed.vue'

export default {
  name: 'Schedule',
  components : {
	  'liveSchedule' : Live,
	  'upcomingSchedule' : Upcoming,
	  'completedSchedule' : Completed
  },
  data() {
	  return {
		msg: 'Schedule Page',
		width : window.innerWidth,
		height : window.innerHeight
	  }
      
  },
  mounted : function() {
  },
  methods : {
	  addIframe(video, idx) {

	  },
	  resizeEvent(width, height) {
      	this.width = width,
      	this.height = height;
    }
  }
}
</script>

<style>
#schedule {
	margin-top:60px;
	width:100%;
}
</style>