<template>
  <div>
    <nav-bar/>
    <galleries-section :user-id="userId"/>
  </div>
</template>

<script>
import GalleriesSection from "../components/GalleriesSection";
import { authService } from "../services/authService";

export default {
  name: "Galleries",

  components: {
    GalleriesSection
  },

  computed: {
    userId() {
      return this.authorId || authService.getLoggedInUserId()
    },

    authorId() {
      return this.$route.params.id;
    }
  }
};
</script>