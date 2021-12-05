<template>
	<div id="schedule" style="background-color:#f1f1f1">
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
		msg: 'Schedule Page'
	  }
      
  },
  mounted : function() {
	  axios.get("http://localhost:9000/livestream/getUpcomingList").then(function(videos) {
		  //console.log(videos);
	  });
	  axios.get("http://localhost:9000/livestream/getCompletedListIn3Day").then(function(videos) {
		  //console.log(videos);
	  });
  },
  methods : {
	  addIframe(video, idx) {

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