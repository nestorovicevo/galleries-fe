<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'home' }" class="navbar-brand">Galleries</router-link>
        </li>
        <li v-if="canLogout" class="nav-item">
          <router-link :to="{ name: 'my-galleries'}" class="nav-link">My galleries</router-link>
        </li>
        <li v-if="canLogout" class="nav-item">
          <router-link :to="{ name: 'create' }" class="nav-link">Create gallery</router-link>
        </li>
      </ul>
      <span v-if="!canLogout" class="navbar-text">
        <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
      </span>
      <span v-if="!canLogout" class="navbar-text">
        <router-link :to="{ name: 'register' }" class="nav-link">Sign up</router-link>
      </span>
      <span v-if="canLogout" class="navbar-text">
        <a @click="logout" class="nav-link" href="#">Logout</a>
      </span>
    </div>
  </nav>
</template>

<script>
import { authService } from "../services/authService";

export default {
  data() {
    return {
      canLogout: false
    };
  },

  created() {
    this.canLogout = authService.isAuthenticated();
  },

  methods: {
    async logout() {
      try {
        await authService.logout();
        this.navigateToLogin();
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