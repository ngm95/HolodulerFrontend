<template>
    <div id="board">
        <div class="jumbotron" style="background-color: #f1f1f1">
            <!-- <newPostModal></newPostModal> -->

            <div class="d-flex justify-content-between" id="boardStart">
                <div class="d-flex">
                    <h3>
                        <b>게시판</b>
                    </h3>
                </div>
                <div class="d-flex">
                    <b-button variant="primary" data-bs-toggle="modal" data-bs-target="#postModal" style="float: right">새로운 글 작성</b-button>
                </div>
            </div>

            <b-table id="boardTable" responsive="sm" striped :items="boardList" :per-page="perPage" :current-page="currentPage" :fields="fields">
                <template #cell(title)="data">
                    <router-link v-bind:to="'/board/boardList/'+data.item.boardId">{{data.item.title}}</router-link>
                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="boardTable" align="fill"></b-pagination>
        </div>
		
		<div class="jumbotron">
            <b-input-group prepend="제목">
                <b-form-input v-model="searchForm" placeholder="검색할 게시물 제목"></b-form-input>
                <b-button variant="primary" @click="searchBoard">검색</b-button>
            </b-input-group>
		</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Board',
  data () {
    return {
        fields : [{key:'boardId', label:'글 번호'}, {key:'title', label:'제목'}, {key:'viewed', label:'조회수'}, {key:'love', label:'좋아요'}, {key:'dislike', label:'싫어요'}, {key:'date', label:'작성일'}],
        boardList : [],
        perPage : 10,
        currentPage : 1,
        searchForm : ''
    }
  },
  components : {
    
  },
  beforeCreate : function() {
      axios.get('http://192.168.0.8:9000board/getAllBoardList').then(result => {
          if (result.status == 200)
              this.boardList = result.data;
          else {
              axios.get('http://114.206.252.118:25380/board/getAllBoardList').then(result => {
                this.boardList = result.data;
            });
          }
      });
  },
  computed : {
      rows() {
          return this.boardList.length;
      }
  },
  methods : {
        addIframe(video, idx) {},
        searchBoard() {
            if (this.searchForm == '')
                axios.get('http://192.168.0.8:9000/board/getAllBoardList').then(result => {
                    if (result.status == 200)
                        this.boardList = result.data;
                    else {
                        axios.get('http://114.206.252.118:25380/board/getAllBoardList').then(result => {
                            this.boardList = result.data;
                        });
                    }
                });
            else
                axios.get('http://192.168.0.8:9000/board/getAllBoardLikeTitle/'+this.searchForm).then(result => {
                    if (result.status == 200) 
                        this.boardList = result.data;
                    else {
                        axios.get('http://114.206.252.118:25380/board/getAllBoardLikeTitle/'+this.searchForm).then(result => {
                            this.boardList = result.data;
                        });
                    }
                });
        }
  }
}
</script>

<style>
#board {
    margin-top : 60px;
}
#boardStart {
    padding-top:30px; 
    padding-bottom:50px
}
#boardTable {
    min-height : 460px;
}
</style>