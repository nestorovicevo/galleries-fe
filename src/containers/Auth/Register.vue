<template>
  <div>
    <nav-bar/>

    <form @submit.prevent="registerUser" class="jumbotron">
      <div class="form-group row">
        <label class="col-4 col-form-label" for="first_name">First name:</label>
        <div class="col-8">
          <input
            id="first_name"
            name="first_name"
            type="text"
            class="form-control here"
            v-model="credentials.first_name"
          >
        </div>
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="last_name">Last name:</label>
        <div class="col-8">
          <input
            id="last_name"
            name="last_name"
            type="text"
            class="form-control here"
            v-model="credentials.last_name"
          >
        </div>
      </div>
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
        <label class="col-4 col-form-label" for="password">Password:</label>
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
      <div class="form-group row">
        <label class="col-4 col-form-label" for="password">Confirm password:</label>
        <div class="col-8">
          <input
            name="password_confirmation"
            class="form-control here"
            type="password"
            data-vv-as="password"
            v-model="credentials.password_confirmation"
          >
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="checkbox" v-model="checked">
          <label class="form-check-label" for="checkbox">I accept terms and conditions</label>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { authService } from "../../services/authService";

export default {
  name: "Register",

  data() {
    return {
      credentials: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      checked: false
    };
  },

  methods: {
    async registerUser() {
      try {
        if (this.checked) {
          await authService.register(this.credentials);
          this.navigateToLogin();
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log(error); //eslint-disable-line
      }
    },

    navigateToLogin() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

