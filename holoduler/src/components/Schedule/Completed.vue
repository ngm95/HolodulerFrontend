<template>
    <div id="completedBoard" class="jumbotron">
		<h3 style="margin-top: 50px">종료된 최근 방송</h3>
		<div v-if="completedVideos.length > 0" class="row row-cols-auto" style="margin-right:0px">
			<div v-for="(completed, index) in completedVideos" :key="completed.videoId" class="col" style="margin-bottom: 15px;">
				<div class="d-flex">
					<div class="card" style="cursor: pointer; border-width: thick; border-color: red; width:330px; height:240px" v-bind:onclick="'window.open(\'https://youtube.com/watch?v='+completed.videoId + '\')'">
						<div class="d-flex flex-column">
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex flex-row">
									<div class="d-flex">
										<img v-bind:src="completedVideos[index].profilePath" style="border-radius: 50%; width: 40px; border: 2px white solid;">
									</div>
								<div class="d-flex" style="margin-left: 7px; margin-top: 8px">
									{{completed.memberName}}
								</div>
								</div>
								<div id="infoDiv" class="d-flex-column">
									<div class="d-flex">
										<b>{{completed.actualStartTime.substring(0, 8)}}</b>
									</div>
									<div class="d-flex">
										<b>{{completed.actualStartTime.substring(9, 8)}}</b>
									</div>
								</div>
							</div>
							<div class="d-flex">
								<img v-bind:src="'https://i.ytimg.com/vi/'+completed.videoId+'/mqdefault.jpg'" style="width: 320px; height:180px;">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h4>3일 이내에 종료된 방송이 없습니다.</h4>
		</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : "CompletedSchedule",
    data() {
        return {
            completedVideos : []
       }
    },
    beforeCreate : function() {
        axios.get("http://192.168.0.8:9000/livestream/getCompletedListIn3Day").then(result=> {
			if (result.status == 200)
            this.completedVideos = result.data;
			else {
				axios.get("http://114.206.252.118:25380/livestream/getCompletedListIn3Day").then(result=> {
					this.completedVideos = result.data;
				});
			}
	  	}).catch(result => {
			  axios.get("http://114.206.252.118:25380/livestream/getCompletedListIn3Day").then(result=> {
					this.completedVideos = result.data;
				});
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