<template>
    <div id="liveBoard" class="jumbotron">
		<h3>라이브 중인 방송</h3>
		<div v-if="liveVideos.length > 0" class="row row-cols-auto" style="margin-right:0px">
			<div v-for="(live, index) in liveVideos" :key="live.videoId" class="col" style="margin-bottom: 15px">
				<div class="d-flex">
					<div class="card" style="cursor: pointer; border-width: thick; border-color: red; width:330px; height:230px" v-bind:onclick="liveVideos[index].youtubePath">
						<div class="d-flex flex-column">
							<div class="d-flex justify-content-between">
								<div class="d-flex flex-row">
									<div class="d-flex">
										<img v-bind:src="liveVideos[index].profilePath" style="border-radius: 50%; width: 40px; border: 2px white solid;">
									</div>
								<div class="d-flex" style="margin-left: 7px; margin-top: 8px">
									{{live.memberName}}
								</div>
								</div>
								<div class="d-flex" style="margin-top: 8px">
									<b>{{live.actualStartTime}}</b>
								</div>
							</div>
							<div class="d-flex">
								<img v-bind:src="liveVideos[index].thumbnailPath" style="width: 320px; height:180px;">
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
        axios.get("http://localhost:9000/livestream/getLiveList").then(result=> {
		    var videos = result.data;
            this.liveVideos = videos;
	  });
    }
}
</script>

<style scoped>
.col {
	margin-left:20px;
}
</style>