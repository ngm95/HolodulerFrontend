<template>
  <div class="header">
    <nav id="nav" class="navbar navbar-light bg-light fixed-top" >
      <div class="container-fluid">
      
        <div class="d-flex flex-row justify-content-between" v-bind:style="'width:' + (width-25) + 'px'">
          <div class="d-flex flex-row">
            <b-button variant="outline-info" v-b-toggle.sidebar-1 style="width:50px; height:50px"><span class="navbar-toggler-icon"></span></b-button>
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
              <findVideoModal ref="findVideoModal" v-on:selected="selectedModal"/>
              <b-button id="findVideoBtn" v-b-modal.modal-scrollable variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
              </b-button>
            </div>
              <div id="profileList" class="d-flex flex-row justify-content-start" v-bind:style="'width:' + (width-222) + 'px ;overflow:auto hidden'"> 
                <div class="d-flex align-items-center" v-for="(profile, index) in profiles" :key="profile.videoId"  v-bind:id="'profile'+index" @click="selected($event, index, profile.videoId)" >
                  <div v-if="typeof(profile.actualStartTime) !== 'undefined'">
                    <b-tooltip v-bind:target="'profile'+index" triggers="hover" placement="bottom" boundary="window">
                      <div class="d-flex flex-column">
                        <div class="d-flex">
                          <img v-bind:src="'https://i.ytimg.com/vi/'+profile.videoId+'/mqdefault.jpg'" width="100%" height="100%">
                        </div>
                        <div class="d-flex flex-row justify-content-center">
                          시작 시각 : {{ profile.actualStartTime.substring(9) }}
                        </div>
                      </div>
                    </b-tooltip>
                    <b-avatar v-bind:src="profile.profilePath" style="border:2px red solid"></b-avatar> 
                  </div>
                  <div v-else>
                    <b-tooltip v-bind:target="'profile'+index" triggers="hover" placement="bottom" boundary="window">
                      <div class="d-flex flex-column">
                        <div class="d-flex">
                          <img v-bind:src="'https://i.ytimg.com/vi/'+profile.videoId+'/mqdefault.jpg'" width="100%" height="100%">
                        </div>
                        <div class="d-flex flex-row justify-content-center">
                          예정 시각 : {{ profile.scheduledStartTime.substring(9) }}
                        </div>
                      </div>
                    </b-tooltip>
                    <b-avatar v-bind:src="profile.profilePath" style="border:2px green solid"></b-avatar> 
                  </div>
                </div>
            </div>
          </div>
          <div class="d-flex" style="width:42px; height:50px">
            <b-button variant="info"><b-icon icon="intersect"></b-icon></b-button>
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
      width : window.innerWidth,
    }
  },
  components : {
    'findVideoModal' : FindVideoModal
  },
  mounted : function() {
    this.getProfile();
    this.interval = setInterval(this.getProfile, 1000*60*2);
  },
  methods : {
    // 프로필을 선택했을 때 App.vue의 메소드 호출 후 해당 프로필 제거
    selected : function(event, idx, videoId) {
      console.log(this.$router.history.current.fullPath);
      if (this.$router.history.current.fullPath == '/multiview') {
        this.$emit('selected', this.profiles[idx], idx);

        this.deleteProfile(idx);
        this.addPlaying(videoId);
      }
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
      axios.get("http://192.168.0.8:9000/livestream/videoInfo").then(result => {
        if (result.status == 200) {
          var videos = result.data;
          this.profiles = [];
          for (var i in videos) {
            if (!this.playing.includes(videos[i].videoId)) {
              this.profiles.push(videos[i]);
            }
          }
        }
      }).catch(error => {
        axios.get("http://114.206.252.118:25380/livestream/videoInfo").then(result => {
            if (result.status == 200) {
              var videos = result.data;
              this.profiles = [];
              for (var i in videos) {
                if (!this.playing.includes(videos[i].videoId)) {
                  this.profiles.push(videos[i]);
                }
              }
            }
          });
      });
      this.$refs.findVideoModal.readUpcoming();
      this.$refs.findVideoModal.readLive();
      console.log('profile data import complete');
    },
    resizeEvent(width) {
      this.width = width;
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
#nav {
  padding-top:2px; padding-bottom:2px; height:60px;
}
</style>