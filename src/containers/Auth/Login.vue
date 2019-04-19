<template>
  <div>
    <nav-bar/>

    <form @submit.prevent="loginUser" class="jumbotron">
      <div class="form-group row">
        <label class="col-4 col-form-label" for="email">Email:</label>
        <div class="col-8">
          <input
            id="email"
            name="email"
            type="email"
            class="form-control here"
            v-model="credentials.email"
          >
        </div>
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="password">Password</label>
        <div class="col-8">
          <input
            ref="password"
            id="password"
            name="password"
            type="password"
            class="form-control here"
            v-model="credentials.password"
          >
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { authService } from "../../services/authService";

export default {
  name: "Login",

  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    async loginUser() {
      try {
        const response = await authService.login(this.credentials);
        authService.storeAuthData(response.access_token, response.user_id);
        this.navigateToHome();
      } catch (error) {
        alert(error.response.data.message);
        console.log(error); //eslint-disable-line
      }
    },

    navigateToHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

