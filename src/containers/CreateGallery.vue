<template>
  <div>
    <nav-bar/>

    <div class="container">
      <div class="jumbotron">
        <div class="form-group row">
          <label class="col-4 col-form-label" for="gallery.name">Name:</label>
          <div class="col-8">
            <input type="text" class="form-control here" v-model="gallery.name">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-4 col-form-label">Description:</label>
          <div class="col-8">
            <input type="text" class="form-control here" v-model="gallery.description">
          </div>
        </div>
        <div
          v-for="(link, index) in gallery.pictures_urls"
          v-bind:key="index"
          class="form-group row"
        >
          <label class="col-4 col-form-label" for="gallery.pictures_urls">URL:</label>
          <div class="col-8 d-flex justify-content-between">
            <input type="text" class="form-control here" v-model="gallery.pictures_urls[index]">
            <div class="col-8 d-flex justify-content-between">
              <button
                v-if="canDeleteUrl"
                @click="deleteUrl(index)"
                class="btn btn-danger"
              >Delete URL</button>
              <button v-if="index > 0" @click="moveUp(index)" class="btn btn-secondary">Move up</button>
              <button
                v-if="index < gallery.pictures_urls.length - 1"
                @click="moveDown(index)"
                class="btn btn-dark"
              >Move down</button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <button @click="addAnotherUrl" class="btn btn-success mr-2">Add another URL</button>
          <button @click="createGallery" class="btn btn-primary">Create gallery</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { galleriesService } from "../services/galleriesService";

export default {
  name: "CreateGallery",

  data() {
    return {
      gallery: {
        // user_id: 1, //TODO refactor
        name: "",
        description: "",
        pictures_urls: [""]
      }
    };
  },

  computed: {
    canDeleteUrl() {
      return this.gallery.pictures_urls.length > 1;
    }
  },

  methods: {
    moveUp(index) {
      if (index > 0) {
        var values = [
          this.gallery.pictures_urls[index],
          this.gallery.pictures_urls[index - 1]
        ];
        this.gallery.pictures_urls.splice(index - 1, 2, values[0], values[1]);
      }
    },

    moveDown(index) {
      if (index < this.gallery.pictures_urls.length - 1) {
        var values = [
          this.gallery.pictures_urls[index + 1],
          this.gallery.pictures_urls[index]
        ];
        this.gallery.pictures_urls.splice(index, 2, values[0], values[1]);
      }
    },

    addAnotherUrl() {
      this.gallery.pictures_urls.push("");
    },

    deleteUrl(index) {
      if (this.canDeleteUrl) {
        this.gallery.pictures_urls.splice(index, 1);
      }
    },

    async createGallery() {
      try {
        await galleriesService.createGallery(this.gallery);
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