<template>
 <b-modal id="modal-scrollable" size="xl" scrollable title="영상 상세정보">
     <b-card id="card" no-body> 
        <b-tabs content-class="mt-3">
            <b-tab title="라이브 중인 방송" active>
                <div id="videoDiv" class="row row-cols-auto" style="margin-left:10px">
                    <div v-for="(live, index) in liveVideos" :key="live.videoId" @click="selectedLive($event, live.videoId)" v-bind:id="index" name="select" class="col" style="margin-bottom: 15px; padding-left: 8px; pdding-right: 8px">
                        <div class="d-flex">
                            <div class="card" style="border-width: thick; border-color: red; width: 135px; height: 140.5px">
                                <div class="d-flex flex-column">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex flex-row">
                                            <div class="d-flex">
                                                <img v-bind:src="live.profilePath" style="border-radius: 50%; width: 50px; height:50px; border: 1px white solid">
                                            </div>
                                        </div>
                                        <div id="datetime" class="d-flex flex-column">
                                            <div class="d-flex">
                                                <b>{{live.actualStartTime.substr(0, 8)}}</b>
                                            </div>
                                            <div class="d-flex">
                                                <b>{{live.actualStartTime.substr(9, 8)}}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="thumbnail" class="d-flex">
                                        <img v-bind:src="'https://i.ytimg.com/vi/'+live.videoId+'/mqdefault.jpg'" style="width: 125px; height: 75.5px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="예약된 방송">
                <div id="videoDiv" class="row row-cols-auto" style="margin-left:10px">
                    <div v-for="(upcoming, index) in upcomingVideos" :key="upcoming.videoId" @click="selectedUpcoming($event, upcoming.videoId)" v-bind:id="index" name="select" class="col" style="margin-bottom: 15px; padding-left: 8px; pdding-right: 8px">
                        <div class="d-flex">
                            <div class="card" style="border-width: thick; border-color: green; width: 135px; height: 140.5px">
                                <div class="d-flex flex-column">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex flex-row">
                                            <div class="d-flex">
                                                <img v-bind:src="upcoming.profilePath" style="border-radius: 50%; width: 50px; height:50px; border: 1px white solid">
                                            </div>
                                        </div>
                                        <div id="datetime" class="d-flex flex-column">
                                            <div class="d-flex">
                                                <b>{{upcoming.scheduledStartTime.substr(0, 8)}}</b>
                                            </div>
                                            <div class="d-flex">
                                                <b>{{upcoming.scheduledStartTime.substr(9, 8)}}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="thumbnail" class="d-flex">
                                        <img v-bind:src="'https://i.ytimg.com/vi/'+upcoming.videoId+'/mqdefault.jpg'" style="width: 125px; height: 75.5px;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-tab>
            <b-tab title="종료된 방송">
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row justify-content-end" style="margin-left:10px">
                        <div class="d-flex">
                            <b-form-datepicker name="startDate" :hide-header='true' :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit' }" @input="readCompleted" v-model="startDate"></b-form-datepicker>
                        </div>
                        <div class="d-flex">
                            <b-form-datepicker name="endDate" :hide-header=true :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit' }" @input="readCompleted" v-model="endDate"></b-form-datepicker>
                        </div>
                    </div>
                    <hr/>
                    <div class="d-flex flex-column">
                        <div id="videoDiv" class="row row-cols-auto">
                            <div v-for="(completed, index) in completedVideos" :key="completed.videoId" @click="selectedCompleted($event, completed.videoId)" v-bind:id="index" name="select" class="col" style="margin-bottom: 15px; padding-left: 8px; pdding-right: 8px">
                                <div class="d-flex">
                                    <div class="card" style="border-width: thick; border-color: gray; width: 135px; height: 140.5px">
                                        <div class="d-flex flex-column">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex flex-row">
                                                    <div class="d-flex">
                                                        <img v-bind:src="completed.profilePath" style="border-radius: 50%; width: 50px; height:50px; border: 1px white solid">
                                                    </div>
                                                </div>
                                                <div id="datetime" class="d-flex flex-column">
                                                    <div class="d-flex">
                                                        <b>{{completed.actualStartTime.substr(0, 8)}}</b>
                                                    </div>
                                                    <div class="d-flex">
                                                        <b>{{completed.actualStartTime.substr(9, 8)}}</b>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="thumbnail" class="d-flex">
                                                <img v-bind:src="'https://i.ytimg.com/vi/'+completed.videoId+'/mqdefault.jpg'" style="width: 125px; height: 75.5px;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </b-tab>
        </b-tabs>
     </b-card>

 </b-modal>
</template>


<script>
import axios from 'axios'

    export default {
        data() {
            const now = new Date()
            const threeDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate()-3)
            
            return {
                startDate : setInitialDate(threeDaysAgo),
                endDate : setInitialDate(now),
                liveVideos : [],
                upcomingVideos : [],
                completedVideos : []
            }
        },
        methods : {
            readCompleted() {
                axios.get('http://192.168.0.8:9000/livestream/getCompletedListBetweenSomeday/'+this.startDate+"/"+this.endDate).then(result => {
                    if (result.status == 200)
                        this.completedVideos = result.data;
                    else {
                        axios.get('http://114.206.252.118:25380/livestream/getCompletedListBetweenSomeday/'+this.startDate+"/"+this.endDate).then(result => {
                            this.completedVideos = result.data;
                        });
                    }
                }).catch(result => {
                    axios.get('http://114.206.252.118:25380/livestream/getCompletedListBetweenSomeday/'+this.startDate+"/"+this.endDate).then(result => {
                            this.completedVideos = result.data;
                        });
                });
                
            },
            selectedLive : function(event, videoId) {
                var targetId = event.currentTarget.id;
                this.$emit('selected', this.liveVideos[targetId], videoId);
            },
            selectedUpcoming : function(event, videoId) {
                var targetId = event.currentTarget.id;
                this.$emit('selected', this.upcomingVideos[targetId], videoId);
            },
            selectedCompleted : function(event, videoId) {
                var targetId = event.currentTarget.id;
                this.$emit('selected', this.completedVideos[targetId], videoId);
            }
        },
        beforeMount : function() {
            axios.get('http://192.168.0.8:9000/livestream/getLiveList').then(result => {
                if (result.status == 200)
                    this.liveVideos = result.data;
                else {
                    axios.get('http://114.206.252.118:25380/livestream/getLiveList').then(result => {
                        if (result.status == 200)
                            this.liveVideos = result.data;
                    })
                }
            }).catch(result => {
                axios.get('http://114.206.252.118:25380/livestream/getLiveList').then(result => {
                        if (result.status == 200)
                            this.liveVideos = result.data;
                    })
            });
            
            axios.get('http://192.168.0.8:9000/livestream/getUpcomingList').then(result => {
                if (result.status == 200)
                    this.upcomingVideos = result.data;
                else {
                    axios.get('http://114.206.252.118:25380/livestream/getUpcomingList').then(result => {
                        if (result.status == 200)
                            this.upcomingVideos = result.data;
                    })
                }    
            }).catch(result => {
                axios.get('http://114.206.252.118:25380/livestream/getUpcomingList').then(result => {
                        if (result.status == 200)
                            this.upcomingVideos = result.data;
                    })
            });

            axios.get('http://192.168.0.8:9000/livestream/getCompletedListIn3Day').then(result => {
                if (result.status == 200)    
                    this.completedVideos = result.data;
                else {
                    axios.get('http://114.206.252.118:25380/livestream/getCompletedListIn3Day').then(result => {
                        if (result.status == 200)
                            this.completedVideos = result.data;
                    })
                }
            }).catch(result => {
                axios.get('http://114.206.252.118:25380/livestream/getCompletedListIn3Day').then(result => {
                        if (result.status == 200)
                            this.completedVideos = result.data;
                    })
            });
        }
    }

    function setInitialDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;

        return date.getFullYear() + '-' + month + '-' + day;
    }
</script>


<style>


.row, .col {
    padding : 0px 0px 0px 0px;
}
#videoDiv {
    margin-left:10px;
    min-height: 400px;
}
#datetime {
    margin-top : 3px;
}
#thumbnail {
    margin-top : 5px;
}
</style>