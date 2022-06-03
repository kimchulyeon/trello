<template>
  <div>
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from '@/layouts/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
};
</script>
