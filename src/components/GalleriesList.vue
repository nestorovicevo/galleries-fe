<template>
  <div class="container">
    <div class="row pt-3">
      <gallery-item v-for="gallery in galleries" v-bind:key="gallery.id" :gallery="gallery"/>
    </div>
  </div>
</template>

<script>
import GalleryItem from "./GalleryItem";

export default {
  name: "GalleriesList",

  components: {
    GalleryItem
  },

  props: {
    galleries: Array
  }
};
</script>

