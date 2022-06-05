<template>
  <div>
    <h1>board</h1>
    <div v-if="loading">Loading Board...</div>
    <div v-else>
      <div>BOARD: {{ bid }}</div>
      <router-link :to="`/b/${bid}/c/1`">Card-1</router-link>
      <router-link :to="`/b/${bid}/c/2`">Card-2</router-link>
    </div>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
// curl localhost:3000/boards -H 'Authorization: Bearer token'
// curl localhost:3000/boards/1 -H 'Authorization: Bearer token'
export default {
  data() {
    return {
      bid: 0,
      loading: false,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.bid = this.$route.params.bid;
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
