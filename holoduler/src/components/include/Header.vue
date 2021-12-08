<template>
  <div class="header">
    <nav class="navbar navbar-light bg-light fixed-top" style="padding-top:2px; padding-bottom:2px; height:60px">
      <div class="container-fluid">
      
        <div class="d-flex flex-row">
          <b-button variant="outline-info" v-b-toggle.sidebar-1><span class="navbar-toggler-icon"></span></b-button>
          <b-sidebar id="sidebar-1" title="메뉴" shadow>
            <div class="px-3 py-2">
              <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item"><router-link to="/">홈</router-link></li>
                <li class="nav-item"><router-link to="/schedule">스케줄</router-link></li>
                <li class="nav-item"><router-link to="/multiview">멀티 뷰</router-link></li>
                <li class="nav-item"><router-link to="/board">게시판</router-link></li>
              </ul>
            </div>
            </div>
          </b-sidebar>

          <div class="d-flex">
            <b-button id="refreshBtn" variant="warning" @click="getProfile">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </b-button>
          </div>
          <div class="d-flex">
            <findVideoModal v-on:selected="selectedModal"/>
            <b-button id="findVideoBtn" v-b-modal.modal-scrollable variant="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </b-button>
          </div>
          <div id="profileList" class="d-flex">
            <div class="d-flex align-items-center" v-for="(profile, index) in profiles" :key="profile.videoId"  v-bind:id="index" @click="selected($event, index, profile.videoId)">
              <div v-if="typeof(profile.actualStartTime) !== 'undefined'"  v-b-tooltip.hover.bottom v-b-tooltip.html="true" 
               v-bind:title="'<div class=\'d-flex flex-column\'><div class=\'d-flex flex-row\'><img src=\'' + 'https://i.ytimg.com/vi/'+profile.videoId+'/mqdefault.jpg' + '\' width=\'100%\' height=\'100%\'></div><div class=\'d-flex flex-row justify-content-center\'>시작 시각 : ' + profile.actualStartTime.substring(9) + '</div></div>'">
                <b-avatar v-bind:src="profile.profilePath" style="border:2px red solid"></b-avatar>
              </div>
              <div v-else v-b-tooltip.hover.bottom v-b-tooltip.html="true" 
               v-bind:title="'<div class=\'d-flex flex-column\'><div class=\'d-flex flex-row\'><img src=\'' + 'https://i.ytimg.com/vi/'+profile.videoId+'/mqdefault.jpg' + '\' width=\'100%\' height=\'100%\'></div><div class=\'d-flex flex-row justify-content-center\'>예정 시각 : ' + profile.scheduledStartTime.substring(9) + '</div></div>'">
                <b-avatar v-bind:src="profile.profilePath" style="border:2px green solid"></b-avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

  </div>
</template>

<script>
import axios from 'axios'
import FindVideoModal from '../modal/findVideoModal.vue'

export default {
  name: 'Header',
  data() {
    return {
      profiles : [],
      playing : [],
    }
  },
  components : {
    'findVideoModal' : FindVideoModal
  },
  created : function() {
    this.getProfile();
  },
  mounted : function() {
    console.log('interval function start');
    this.interval = setInterval(this.getProfile, 1000*60*2);
  },
  methods : {
    // 프로필을 선택했을 때 App.vue의 메소드 호출 후 해당 프로필 제거
    selected : function(event, idx, videoId) {
      this.$emit('selected', this.profiles[idx], idx);

      this.deleteProfile(idx);
      this.addPlaying(videoId);
    },
    // 모달에서 영상을 선택했을 때 App.vue의 메소드 호출
    selectedModal : function(video, videoId) {   
      this.$emit('selected', video, 1);

      this.addPlaying(videoId);
      this.getProfile();
    },
    // 해당하는 인덱스의 프로필 제거
    deleteProfile : function(idx) {
      this.profiles.splice(idx, 1); 
    },
    // 현재 플레이 중인 리스트에 넣음
    addPlaying : function(videoId) {
      //console.log(videoId);
      this.playing.push(videoId);
    }, 
    deletePlaying : function(videoId) {
      for (var i in this.playing) {
        //console.log(this.playing[i]);
        if (this.playing[i] == videoId){
          this.playing.splice(i, 1);
          this.getProfile();
          return;
        }
      }
    },
    getProfile : function() {
      axios.get("http://localhost:9000/livestream/videoInfo").then(result => {
          var videos = result.data;
          this.profiles = [];
          for (var i in videos) {
            if (!this.playing.includes(videos[i].videoId)) {
              this.profiles.push(videos[i]);
            }
          }
        });
      console.log('profile data import complete');
    }
  }
}


</script>

<style>
#profile {
  padding-left:2px; 
  padding-right:2px;
}
#profileImg {
  border-radius:50%; 
  width:55px;
}
.align-items-center {
  margin-left : 1px;
  margin-right : 1px;
}
#findVideoBtn {
  margin-left : 5px;
  margin-right : 6px;
  height : 50px;
}
#refreshBtn {
  margin-left : 10px;
  height : 50px;
}
.nav-item {
  margin-bottom : 15px;
}
</style>