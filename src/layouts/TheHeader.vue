<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">HOME</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="checkToken" @click.prevent="logout">LOGOUT</a>
      <router-link v-else to="/login">LOGIN</router-link>
    </div>
  </nav>
</template>

<script>
import { setAuthInHeader } from "@/api";

export default {
  methods: {
    logout() {
      // localStorage.removeItem("token");
      delete localStorage.token;
      this.$router.push("/login");
      setAuthInHeader(null);
    },
  },
  computed: {
    checkToken() {
      return !!localStorage.getItem("token");
    },
  },
};
</script>

<style>
.header {
  flex: none;
  background-color: rgba(0, 0, 0, 0.15);
  height: 32px;
  padding: 4px;
}
.header a {
  display: block;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255, 255, 255, 0.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
  transition: all 0.3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
