<template>
 <b-modal id="modal-scrollable" size="xl" scrollable title="영상 상세정보">
     <b-card id="card" no-body> 
        <b-tabs content-class="mt-3">
            <b-tab title="라이브 중인 방송" active>
                <div id="videoDiv" class="row row-cols-auto" style="margin-left:10px">
                    <div v-for="(live, index) in liveVideos" :key="live.videoId" name="select" class="col" style="margin-bottom: 15px; padding-left: 8px; pdding-right: 8px">
                        <div class="d-flex" v-bind:id="index" @click="selectedLive($event, live.videoId)">
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
                    <div v-for="(upcoming, index) in upcomingVideos" :key="upcoming.videoId" name="select" class="col" style="margin-bottom: 15px; padding-left: 8px; pdding-right: 8px">
                        <div class="d-flex" v-bind:id="index" @click="selectedUpcoming($event, upcoming.videoId)">
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
                    <div class="d-flex flex-row justify-content-between">
                        <div class="d-flex" style="margin-left:5px">
                            <b-form-select v-model="selected" :options="selectedMembers" @change="selectedMember()"></b-form-select>
                        </div>
                         <div class="d-flex" style="margin-right:5px">
                            <div class="d-flex">
                                <b-form-datepicker name="startDate" :hide-header='true' :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit' }" @input="[readCompletedBetweenToInternet(), readCompletedBetweenToLan()]" v-model="startDate"></b-form-datepicker>
                            </div>
                            <div class="d-flex">
                                <b-form-datepicker name="endDate" :hide-header=true :date-format-options="{ year: '2-digit', month: '2-digit', day: '2-digit' }" @input="[readCompletedBetweenToInternet(), readCompletedBetweenToLan()]" v-model="endDate"></b-form-datepicker>
                            </div>
                        </div>
                    </div>
                   
                    <hr/>
                    <div class="d-flex flex-column">
                        <div id="videoDiv" class="row row-cols-auto">
                            <div v-for="(completed, index) in completedVideos" :key="completed.videoId" name="select" class="col" style="margin-bottom: 15px; padding-left: 8px; pdding-right: 8px">
                                <div class="d-flex" v-bind:id="index" @click="selectedCompleted($event, completed.videoId)">
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
                startDate : setInitialDate(now),
                endDate : setInitialDate(now),
                liveVideos : [],
                upcomingVideos : [],
                completedVideos : [],
                allCompletedVideos : [],

                selected : null,
                selectedMembers : [
                                    {value:null, text:'모두'},
                                    {value:'토키노 소라', text:'토키노 소라'},{value:'로보코상', text:'로보코상'},{value:'사쿠라 미코', text:'사쿠라 미코'},{value:'호시마치 스이세이', text:'호시마치 스이세이'},{value:'AZKi', text:'AZKi'},
                                    {value:'요조라 멜', text:'요조라 멜'},{value:'아키 로젠탈', text:'아키 로젠탈'},{value:'아카이 하아토', text:'아카이 하아토'},{value:'시라카미 후부키', text:'시라카미 후부키'},{value:'나츠이로 마츠리', text:'나츠이로 마츠리'},
                                    {value:'미나토 아쿠아', text:'미나토 아쿠아'},{value:'무라사키 시온', text:'무라사키 시온'},{value:'나키리 아야메', text:'나키리 아야메'},{value:'유즈키 초코', text:'유즈키 초코'},{value:'오오조라 스바루', text:'오오조라 스바루'},
                                    {value:'네코마타 오카유', text:'네코마타 오카유'},{value:'이누가미 코로네', text:'이누가미 코로네'},{value:'오오카미 미오', text:'오오카미 미오'},
                                    {value:'우사다 페코라', text:'우사다 페코라'},{value:'우루하 루시아', text:'우루하 루시아'},{value:'시라누이 후레아', text:'시라누이 후레아'},{value:'시로가네 노엘', text:'시로가네 노엘'},{value:'호쇼 마린', text:'호쇼 마린'},
                                    {value:'아마네 카나타', text:'아마네 카나타'},{value:'츠노마키 와타메', text:'츠노마키 와타메'},{value:'토코야미 토와', text:'토코야미 토와'},{value:'히메모리 루나', text:'히메모리 루나'},
                                    {value:'유키하나 라미', text:'유키하나 라미'},{value:'모모스즈 네네', text:'모모스즈 네네'},{value:'시시로 보탄', text:'시시로 보탄'},{value:'오마루 폴카', text:'오마루 폴카'},
                                    {value:'라프라스 다크니스', text:'라프라스 다크니스'},{value:'타카네 루이', text:'타카네 루이'},{value:'하쿠이 코요리', text:'하쿠이 코요리'},{value:'사카마타 클로에', text:'사카마타 클로에'},{value:'카자마 이로하', text:'카자마 이로하'},
                                    {value:'아윤다 리스', text:'아윤다 리스'},{value:'무나 호시노바', text:'무나 호시노바'},{value:'아이라니 이오피프틴', text:'아이라니 이오피프틴'},
                                    {value:'쿠레이지 올리', text:'쿠레이지 올리'},{value:'아냐 멜핏사', text:'아냐 멜핏사'},{value:'파볼리아 레이네', text:'파볼리아 레이네'},
                                    {value:'모리 칼리오페', text:'모리 칼리오페'},{value:'타카나시 키아라', text:'타카나시 키아라'},{value:'니노마에 이나니스', text:'니노마에 이나니스'},{value:'가우르 구라', text:'가우르 구라'},{value:'왓슨 아멜리아', text:'왓슨 아멜리아'},
                                    {value:'아이리스', text:'아이리스'},
                                    {value:'츠쿠모 사나', text:'츠쿠모 사나'},{value:'세레스 파우나', text:'세레스 파우나'},{value:'오로 크로니', text:'오로 크로니'},{value:'나나시 무메이', text:'나나시 무메이'},{value:'하코스 벨즈', text:'하코스 벨즈'},
                                    {value:'홀로라이브 공식 채널', text:'홀로라이브 공식 채널'}
                                 ],

                stopFlagInternet : false,
                stopFlagLan : false
            }
        },
        mounted : function () {
            this.readCompletedBetweenToInternet();
            this.readCompletedBetweenToLan();
        },
        methods : {
            readUpcoming() {
                axios.get('http://192.168.0.8:9000/livestream/getUpcomingList').then(result => {
                    if (result.status == 200)
                        this.upcomingVideos = result.data;
                    else {
                        axios.get('http://114.206.252.118:25380/livestream/getUpcomingList').then(result => {
                            if (result.status == 200)
                                this.upcomingVideos = result.data;
                        })
                    }    
                }).catch(error => {
                    axios.get('http://114.206.252.118:25380/livestream/getUpcomingList').then(result => {
                            if (result.status == 200)
                                this.upcomingVideos = result.data;
                        })
                });
            },
            readLive() {
                axios.get('http://192.168.0.8:9000/livestream/getLiveList').then(result => {
                    if (result.status == 200)
                        this.liveVideos = result.data;
                    else {
                        axios.get('http://114.206.252.118:25380/livestream/getLiveList').then(result => {
                            if (result.status == 200)
                                this.liveVideos = result.data;
                        })
                    }
                }).catch(error => {
                    axios.get('http://114.206.252.118:25380/livestream/getLiveList').then(result => {
                            if (result.status == 200)
                                this.liveVideos = result.data;
                        })
                }); 
            },
            readCompleted() {
                axios.get('http://192.168.0.8:9000/livestream/getCompletedListIn3Day').then(result => {
                    if (result.status == 200)    
                        this.completedVideos = result.data;
                    else {
                        axios.get('http://114.206.252.118:25380/livestream/getCompletedListIn3Day').then(result => {
                            if (result.status == 200)
                                this.completedVideos = result.data;
                        })
                    }
                }).catch(error => {
                    axios.get('http://114.206.252.118:25380/livestream/getCompletedListIn3Day').then(result => {
                            if (result.status == 200)
                                this.completedVideos = result.data;
                        })
                });
            },
            async readCompletedBetweenToInternet() {
                if (this.stopFlagInternet == true)
                    return;

                this.stopFlagInternet = true;

                
                const internet = await axios.get('http://114.206.252.118:25380/livestream/getCompletedListSize/'+this.startDate+"/"+this.endDate);
                console.log('access using internet success');
                if (internet != null && internet.status == 200) {
                    this.allCompletedVideos = [];
                    var length = internet.data;
                    for (var offset = 0; offset <= length; offset += 100) {
                        await axios.get('http://114.206.252.118:25380/livestream/getCompletedListBetweenSomeday/'+this.startDate+"/"+this.endDate+"/"+offset).then(result => {
                            var videos = result.data;
                            for (var i in videos)
                                this.allCompletedVideos.push(videos[i]);
                        });
                    }
                    this.selectedMember();
                }

                this.stopFlagInternet = false;
            },
            async readCompletedBetweenToLan() {
                if (this.stopFlagLan == true)
                    return;

                this.stopFlagLan = true;

                const lan = await axios.get('http://192.168.0.8:9000/livestream/getCompletedListSize/'+this.startDate+"/"+this.endDate);
                console.log('access using lan success');
                if (lan.status == 200) {
                    this.allCompletedVideos = [];
                    var length = lan.data;
                    for (var offset = 0; offset <= length; offset += 100) {
                        await axios.get('http://192.168.0.8:9000/livestream/getCompletedListBetweenSomeday/'+this.startDate+"/"+this.endDate+"/"+offset).then(result => {
                            var videos = result.data;
                            for (var i in videos)
                                this.allCompletedVideos.push(videos[i]);
                        });
                    }
                    this.selectedMember();
                }

                this.stopFlagLan = false;
            },
            selectedMember : function() {
                if (this.selected == null) {
                    this.completedVideos = this.allCompletedVideos;
                }
                else {
                    var tmp = new Array();
                    for (var i in this.allCompletedVideos) {
                        if (this.allCompletedVideos[i].memberName == this.selected)
                            tmp.push(this.allCompletedVideos[i]);
                    }
                    this.completedVideos = tmp;
                }
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

#videoDiv {
    margin-left:5px;
    min-height: 400px;
}
#datetime {
    margin-top : 3px;
}
#thumbnail {
    margin-top : 5px;
}
</style>