<template>
    <div id="upcomingBoard" class="jumbotron">
		<h3 style="margin-top: 50px">예정된 방송</h3>
		<div v-if="upcomingVideos.length > 0" class="row row-cols-auto" style="margin-right:0px">
			<div v-for="(upcoming, index) in upcomingVideos" :key="upcoming.videoId" class="col" style="margin-bottom: 15px">
				<div class="d-flex">
					<div class="card" style="cursor: pointer; border-width: thick; border-color: green; width:330px; height:240px" v-bind:onclick="'window.open(\'https://youtube.com/watch?v='+upcoming.videoId + '\')'">
						<div class="d-flex flex-column">
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex flex-row">
									<div class="d-flex">
										<img v-bind:src="upcomingVideos[index].profilePath" style="border-radius: 50%; width: 50px; border: 2px green solid;">
									</div>
								<div class="d-flex" style="margin-left: 7px; margin-top: 8px">
									{{upcoming.memberName}}
								</div>
								</div>
								<div id="infoDiv" class="d-flex-column">
									<div class="d-flex">
										<b>{{upcoming.scheduledStartTime.substring(0, 8)}}</b>
									</div>
									<div class="d-flex">
										<b>{{upcoming.scheduledStartTime.substring(9)}}</b>
									</div>
								</div>
							</div>
							<div class="d-flex">
								<img v-bind:src="'https://i.ytimg.com/vi/'+upcoming.videoId+'/mqdefault.jpg'" style="width: 320px; height:180px;">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h4>예정되어 있는 방송이 없습니다.</h4>
		</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : "UpcomingSchedule",
    data() {
        return {
            upcomingVideos : []
       }
    },
    beforeCreate : function() {
        axios.get("http://localhost:9000/livestream/getUpcomingList").then(result=> {
			console.log(result.data.scheduledStartTime);
            this.upcomingVideos = result.data;
	  });
    }
}
</script>

<style scoped>
.col {
	margin-left:20px;
}
#infoDiv{
	margin-top: 4px; 
	margin-right:15px;
}
</style>