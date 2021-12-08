<template>
    <div id="multiview" v-bind:style="'width:' + width + 'px; height:' + (height-60) + 'px;'">
			<div id="iframeDiv" v-bind:width="width" v-bind:height="height" v-bind:style="'width:' + width + 'px; height:' + (height-60) + 'px;'">
        <div v-if="iframes.length <= 0" style="padding-top:100px">
            <h1>도움말</h1>
            <br/>
            <p>상단의 프로필은 <i style="color:red"><b>방송 중인 동영상</b></i>과 <i style="color:green"><b>곧 시작할 동영상</b></i>으로 구성되어 있습니다.</p>
            <br/>
            <p>+버튼으로 프로필에 노출되지 않는 영상을 검색할 수 있습니다.</p>
            <br/>
            <p>프로필 혹은 +버튼으로 검색한 영상을 클릭하면 자동으로 영상이 추가되고 레이아웃이 적용됩니다.</p>
          </div>
        <div v-for="(iframe, index) in iframes" :key="iframe.videoId">
          <div id="video" v-bind:style="iframeStyle[index]">
            <div class="d-flex flex-column" style="border:1px gray solid; border-radius:5px;">
              <div clas="d-flex">
                <iframe v-bind:id="iframe.videoId" v-bind:width="iframeLayout[iframes.length-1][index][0]-1" v-bind:height="iframeLayout[iframes.length-1][index][1]-subHeight" v-bind:src="'https://www.youtube.com/embed/'+iframe.videoId" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              <div class="d-flex justify-content-end">
                <div class="d-flex" style="font-size:1.0em">
                  ↑ 영상 제거 → &nbsp;
                </div>
                <div class="d-flex">
                  <b-button variant="outline-secondary" size="sm" v-bind:id="index" v-bind:name="iframe.videoId" @click="deleteIframe">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                  </b-button>
                </div>
              </div>
           </div>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
	var sizeArr = [[[24, 24]], [[12, 24], [12, 24]], [[12, 24], [12, 12], [12, 12]], [[12, 12], [12, 12], [12, 12], [12, 12]], [[12, 15], [12, 15], [8, 9], [8, 9], [8, 9]], [[8, 12], [8, 12], [8, 12], [8, 12], [8, 12], [8, 12]],
					[[9, 12], [9, 12], [9, 12], [9, 12], [6, 8], [6, 8], [6, 8]], [[10, 12], [10, 12], [7, 8], [7, 8], [7, 8], [7, 8], [7, 8], [7, 8]], [[8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8]]];
	var posArr = [[[0, 0]], [[0, 0], [12, 0]], [[0, 0], [12, 0], [12, 12]], [[0, 0], [12, 0], [0, 12], [12, 12]], [[0, 0], [12, 0], [0, 15], [8, 15], [16, 15]], [[0, 0], [8, 0], [16, 0], [0, 12], [8, 12], [16, 12]], 
					[[0, 0], [9, 0], [0, 12], [9, 12], [18, 0], [18, 8], [18, 16]], [[0, 0], [0, 12], [10, 0], [17, 0], [10, 8], [17, 8], [10, 16], [17, 16]], [[0, 0], [8, 0], [16, 0], [0, 8], [8, 8], [16, 8], [0, 16], [8, 16], [16, 16]]];

export default {
  name: 'Multiview',
  data () {
    return {
      width : window.innerWidth,
      height : window.innerHeight,
      stdW : window.innerWidth/24,
      stdH : window.innerHeight/24,
      subHeight : 40,
      iframes : [],
      iframeStyle : [],
      iframeLayout : [[[24, 24]], 
                     [[12, 24], [12, 24]], 
                     [[12, 24], [12, 12], [12, 12]], 
                     [[12, 12], [12, 12], [12, 12], [12, 12]], 
                     [[12, 15], [12, 15], [8, 9], [8, 9], [8, 9]], 
                     [[8, 12], [8, 12], [8, 12], [8, 12], [8, 12], [8, 12]],
					           [[9, 12], [9, 12], [9, 12], [9, 12], [6, 8], [6, 8], [6, 8]], 
                     [[10, 12], [10, 12], [7, 8], [7, 8], [7, 8], [7, 8], [7, 8], [7, 8]], 
                     [[8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8], [8, 8]]],
	    iframePos : [[[0, 0]], 
                  [[0, 0], [12, 0]], 
                  [[0, 0], [12, 0], [12, 12]], 
                  [[0, 0], [12, 0], [0, 12], [12, 12]], 
                  [[0, 0], [12, 0], [0, 15], [8, 15], [16, 15]], 
                  [[0, 0], [8, 0], [16, 0], [0, 12], [8, 12], [16, 12]],	
                  [[0, 0], [9, 0], [0, 12], [9, 12], [18, 0], [18, 8], [18, 16]], 
                  [[0, 0], [0, 12], [10, 0], [17, 0], [10, 8], [17, 8], [10, 16], [17, 16]], 
                  [[0, 0], [8, 0], [16, 0], [0, 8], [8, 8], [16, 8], [0, 16], [8, 16], [16, 16]]],
    }
  },
  mounted : function() {
    window.addEventListener('resize', this.resizeEvent);
  },
  beforeDestroy : function() {
    window.removeEventListener('resize', this.resizeEvent);
  },
  methods : {
    resizeEvent(event) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      
      this.changeSize();
    },
    addIframe(video, idx) {
      this.iframes.push(video);
      this.changeSize();
    },
    changeSize() {
      if (this.width >= this.height) {
        this.stdW = this.width/24;
        this.stdH = (this.height-60)/24;
        for (var i = 0; i < this.iframeLayout.length; i++) {
          for (var j = 0; j < this.iframeLayout[i].length; j++) {
            this.iframeLayout[i][j][0] = this.stdW * sizeArr[i][j][0];
            this.iframeLayout[i][j][1] = this.stdH * sizeArr[i][j][1];
            this.iframePos[i][j][0] = this.stdW * posArr[i][j][0];
            this.iframePos[i][j][1] = this.stdH * posArr[i][j][1] + 60;
          }
        }
        var numOfVideos = this.iframes.length-1; 
        var lay = this.iframeLayout[numOfVideos];
        var pos = this.iframePos[numOfVideos];
        for (var i = 0; i <= numOfVideos; i++) {
          var style = 'position:absolute; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;';
          style += 'width:' + lay[i][0] + 'px;';
          style += 'height:' + lay[i][1] + 'px;';
          style += 'left:' + pos[i][0] + 'px;';
          style += 'top:' + pos[i][1] + 'px;';
          this.iframeStyle[i] = style;
        }
      }
      else {
        this.stdW = this.width/24;
        this.stdH = this.height/24;
        for (var i = 0; i < this.iframeLayout.length; i++) {
          for (var j = 0; j < this.iframeLayout[i].length; j++) {
            this.iframeLayout[i][j][0] = this.stdW * sizeArr[i][j][1];
            this.iframeLayout[i][j][1] = this.stdH * sizeArr[i][j][0];
            this.iframePos[i][j][0] = this.stdW * posArr[i][j][1];
            this.iframePos[i][j][1] = this.stdH * posArr[i][j][0];
          }
        }
        var numOfVideos = this.iframes.length-1; 
        var lay = this.iframeLayout[numOfVideos];
        var pos = this.iframePos[numOfVideos];
        for (var i = 0; i <= numOfVideos; i++) {
          var style = 'position:absolute; margin:0px 0px 0px 0px; padding:0px 0px 0px 0px;';
          style += 'width:' + lay[i][0] + 'px;';
          style += 'height:' + lay[i][1] + 'px;';
          style += 'left:' + pos[i][0] + 'px;';
          style += 'top:' + pos[i][1] + 'px;';
          this.iframeStyle[i] = style;
        }
      }
    },
    deleteIframe(event) {
      var index = event.currentTarget.id;
      this.iframes.splice(index, 1);
      this.changeSize();
      this.$emit('deleted', event.currentTarget.name);
    }
  }
}
</script>

<style>
  #multiview {
    height:100%;
    padding:0px 0px 0px 0px;
    margin: 60px 0px 0px 0px;
    background-color:#f1f1f1;
  }
  iframe {
    margin : 0px 0px 0px 0px;
    padding : 0px 0px 0px 0px;
  }
</style>
