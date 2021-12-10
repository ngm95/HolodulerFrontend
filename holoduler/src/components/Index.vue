<template>
  <div id="container" v-bind:style="divStyle">
    <div id="textDiv" style="padding-top:10px">
      <p style="margin-bottom: 0px;">
        주기적으로 홀로라이브 JP/EN 멤버들의 유튜브 활동을 확인해 스케줄표를 구성하는 사이트입니다.<br /> 
        실시간 방송 상태와 다소 시간 차이가 발생할 수 있습니다.<br /> <br />


        <a>메뉴 설명</a><br>
        - <a style="font-size: 1.5em">스케줄 표</a> : 현재 라이브 중인 영상, 예약된 영상, 최근 1일 내에 종료된 영상 리스트를 보여줍니다.<br />
         테두리 색에 따라 영상의 상태를 쉽게 확인할 수 있습니다. <br/>
        (<b><a style="color: red">빨간색 - 라이브 중</a>, <a style="color: green">초록색 - 예약됨</a>, <a style="color: gray">회색 - 종료됨</a></b>)<br>

        - <a style="font-size: 1.5em">멀티 뷰</a> : 현재 라이브 중인 방송이나 1시간 내에 시작할 방송을 최대 9개까지 동시에 시청할 수 있습니다.<br />
        멀티 뷰 페이지에서 상단 메뉴 바에 있는 프로필 아이콘을 클릭하면 자동으로 영상이 추가됩니다.<br /> 
        방송 오른쪽 아래에 있는 버튼으로 시청중인 영상을 제거할 수 있습니다.<br />
        영상에서 오류가 발생하면 영상 제거 후 다시 추가해주세요.<br />
        
        <a style="font-size: 1.5em">게시판</a> : 유튜브에서 아카이브 영상이나 클립/키리누키 영상을 공유할 수 있습니다.<br />
        홀로라이브 혹은 버츄얼 유튜버 관련 영상만 올려 주시길 바랍니다.<br />
        적절하지 않은 영상은 삭제될 수 있습니다.<br />
      </p>
      <h1 style="color:pink">Thanks to and Powered By <a href="https://holodex.stoplight.io/">Holodex.net API</a></h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Index Page',
      width : window.innerWidth,
      height : window.innerHeight,
      divStyle : 'width:' + window.innerWidth + 'px; height:' + (window.innerHeight-60) + 'px',
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
      this.divStyle = 'width:' + this.width + 'px; height:' + (this.height-60) + 'px;';
    },
    addIframe(video, idx) {
      
    }
  }
}
</script>

<style scoped>
    #container {
      margin-top:60px;
      background-color:#f1f1f1;
    }
    p {
      margin-top: 40px;
    }
    a {
      font-size: 2.0rem;
    }
</style>