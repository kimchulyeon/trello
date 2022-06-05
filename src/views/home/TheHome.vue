<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div
        class="board-item"
        v-for="b in boards"
        :key="b.id"
        :data-bgcolor="b.bgColor"
        ref="boardItem"
      >
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{ b.title }}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="addBoard"> Create new board... </a>
      </div>
    </div>
  </div>
</template>

<script>
import { board } from "@/api/index";

export default {
  data() {
    return {
      boards: [],
    };
  },
  methods: {
    fetchData() {
      board.getBoards().then((data) => {
        console.log(data.list);
        this.boards = data.list;
      });
    },
    addBoard() {
      console.log("add board");
    },
  },
  // updated 라이프사이클 시점에 DOM이 갱신된다.
  updated() {
    // this.$refs.XXX 는 배열 (아이템은 요소)
    this.$refs.boardItem.forEach((el) => {
      console.log(el.dataset);
      // data-XXX : data-bgcolor (dataset 객체)
      el.style.backgroundColor = el.dataset.bgcolor;
    });
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
