<template>
  <div>
    <div class="container">
      <div class="pt-3 form-inline">
        <input
          class="form-control mr-sm-2"
          v-model="searchTerm"
          type="search"
          placeholder="Search"
          aria-label="Search"
        >
        <button
          @click="searchGalleries"
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >Search</button>
      </div>
    </div>

    <galleries-list :galleries="galleries"/>

    <div class="col-md-12 text-center">
      <button v-if="hasMoreGalleries" @click="loadMore" class="btn btn-secondary">Load more...</button>
    </div>
  </div>
</template>

<script>
import GalleriesList from "../components/GalleriesList";
import { galleriesService } from "../services/galleriesService";

export default {
  name: "Home",

  components: {
    GalleriesList
  },

  props: {
    userId: String
  },

  data() {
    return {
      galleries: [],
      currentPage: 0,
      searchTerm: "",
      hasMoreGalleries: true
    };
  },

  async created() {
    this.fetchGalleries();
  },

  methods: {
    async fetchGalleries() {
      try {
        this.currentPage++;
        const response = await galleriesService.getGalleries(
          this.currentPage,
          this.searchTerm,
          this.userId
        );
        this.galleries.push(...response.data);
        this.hasMoreGalleries = response.to !== response.total && response.data.length;
      } catch (error) {
        alert(error.response.data.message);
        console.log(error); //eslint-disable-line
      }
    },

    loadMore() {
      this.fetchGalleries();
    },

    async searchGalleries() {
      this.currentPage = 0;
      this.galleries = [];
      this.fetchGalleries();
    }
  }
};
</script>
