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
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">홈</a></li>
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/schedule">스케줄</a></li>
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/multiview">멀티 뷰</a></li>
                <li class="nav-item"><a class="nav-link active" aria-current="page" href="/board/main">게시판</a></li>
              </ul>
            </div>
            </div>
          </b-sidebar>

          <div class="d-flex" style="margin-left : 20px">
            <b-button variant="warning" id="refresh" style="margin-right:5px; height:50px">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </b-button>
          </div>
          <div id="findVideo" class="d-flex">
            <findVideoModal v-on:selected="selectedModal"/>
            <b-button v-b-modal.modal-scrollable  variant="secondary" style="margin-right:10px; height:50px">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
            </b-button>
          </div>
          <div id="profileList" class="d-flex">
            <div v-for="(profile, index) in profiles" :key="profile.videoId"  v-bind:id="index" @click="selected">
              <div v-if="typeof(profile.actualStartTime) !== 'undefined'" name="tooltip" v-bind:id="profile.videoId" v-b-tooltip.hover v-b-tooltip.html="true" v-bind:title="profile.tooltip" v-bind:style="profileStyle[index]">
                <b-avatar v-bind:src="profile.profilePath" style="border:2px red solid"></b-avatar>
              </div>
              <div v-else name="tooltip" v-bind:id="profile.videoId" v-b-tooltip.hover v-b-tooltip.html="true" v-bind:title="profile.tooltip" v-bind:style="profileStyle[index]">
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
import FindVideoModal from './modal/findVideoModal.vue'

export default {
  name: 'Header',
  data() {
    return {
      profiles : [],
      profileStyle : []
    }
  },
  components : {
    'findVideoModal' : FindVideoModal
  },
  beforeCreate : function() {
    axios.get("http://localhost:9000/livestream/videoInfo").then(result => {
      var videos = result.data;
      this.profiles = videos;
      for (var i in videos) {
        this.profileStyle[i] = 'order:'+i
      }
    });
  },
  methods : {
    selected : function(event) {
      var targetId = event.currentTarget.id;
      this.$emit('selected', this.profiles[targetId], targetId);
    },
    selectedModal : function(video) {
      this.$emit('selected', video, 1);
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
</style>