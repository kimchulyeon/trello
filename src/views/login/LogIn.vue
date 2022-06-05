<template>
  <div class="login">
    <h2>Login to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          class="form-control"
          type="text"
          name="email"
          v-model="email"
          autofocus
          placeholder="e.g., test@test.com"
        />
      </div>
      <div>
        <label for="password">Passwrod</label>
        <input
          id="password"
          class="form-control"
          type="password"
          v-model="password"
          placeholder="123123"
        />
      </div>
      <button
        class="btn"
        :class="{ 'btn-success': !invalidForm }"
        type="submit"
        :disabled="invalidForm"
      >
        Log In
      </button>
    </form>
    <p class="error" v-if="error">Check your ID or Password</p>
  </div>
</template>

<script>
import { auth, setAuthInHeader } from "@/api/index";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      rPath: "",
    };
  },
  computed: {
    // 아이디나 비밀번호를 입력하지 않았을 때 (:class)
    invalidForm() {
      return !this.email || !this.password;
    },
  },
  methods: {
    onSubmit() {
      auth
        .login(this.email, this.password)
        .then((data) => {
          // 로컬스토리지에 토큰 저장
          if (data.accessToken) {
            this.error = false;
            localStorage.setItem("token", data.accessToken);
            // 요청 헤더에 토큰 보냄
            setAuthInHeader(data.accessToken);
            this.$router.push(this.rPath);
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
  },
  created() {
    this.rPath = this.$route.query.rPath || "/";
  },
};
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}
.error {
  color: #f00;
}
</style>
