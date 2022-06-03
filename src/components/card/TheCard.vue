<template>
  <div>
    <div v-if="loading">Loading Card ......</div>
    <div v-else>
      <h1>card</h1>
      <div>CID: {{ cid }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      cid: 0,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.cid = this.$route.params.cid;
        this.loading = false;
      }, 1000);
    },
  },
  // watch: {
  //   $route() {
  //     this.fetchData();
  //   },
  // },
  watch: {
    $route: {
      handler: 'fetchData',
      immediate: true,
    },
  },
  // created() {
  //   this.fetchData();
  // },
};
</script>
