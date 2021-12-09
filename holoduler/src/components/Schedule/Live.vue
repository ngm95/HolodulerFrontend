<template>
    <div id="liveBoard" class="jumbotron">
		<h3>라이브 중인 방송</h3>
		<div v-if="liveVideos.length > 0" class="row row-cols-auto" style="margin-right:0px">
			<div v-for="(live, index) in liveVideos" :key="live.videoId" class="col" style="margin-bottom: 15px">
				<div class="d-flex">
					<div class="card" style="cursor: pointer; border-width: thick; border-color: red; width:330px; height:240px" v-bind:onclick="'window.open(\'https://youtube.com/watch?v='+live.videoId + '\')'">
						<div class="d-flex flex-column">
							<div class="d-flex justify-content-between align-items-center">
								<div class="d-flex flex-row">
									<div class="d-flex">
										<img v-bind:src="liveVideos[index].profilePath" style="border-radius: 50%; width: 50px; border: 2px red solid;">
									</div>
								<div class="d-flex" style="margin-left: 7px; margin-top: 8px">
									{{live.memberName}}
								</div>
								</div>
								<div id="infoDiv" class="d-flex-column">
									<div class="d-flex">
										<b>{{live.actualStartTime.substring(0, 8)}}</b>
									</div>
									<div class="d-flex">
										<b>{{live.actualStartTime.substring(9)}}</b>
									</div>
								</div>
							</div>
							<div class="d-flex">
								<img v-bind:src="'https://i.ytimg.com/vi/'+live.videoId+'/mqdefault.jpg'" style="width: 320px; height:180px;">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h4>라이브 중인 방송이 없습니다.</h4>
		</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name : "LiveSchedule",
    data() {
        return {
            liveVideos : []
       }
    },
    beforeCreate : function() {
        axios.get("http://192.168.0.8:9000/livestream/getLiveList").then(result=> {
			if (result.status == 200)
            	this.liveVideos = result.data;
	  	}).catch(result => {
			  axios.get("http://114.206.252.118:25380/livestream/getLiveList").then(result=> {
					this.liveVideos = result.data;
				});
		  });
    }
}
</script>

<style scoped>
.row {
	margin-left : 10px;
}
.col {
	margin-left:10px;
}
#infoDiv{
	margin-top: 4px; 
	margin-right:15px;
}
</style>