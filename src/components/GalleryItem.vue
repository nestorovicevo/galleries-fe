<template>
  <div class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img
        class="card-img-top"
        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
        alt="Thumbnail [100%x225]"
        style="height: 225px; width: 100%; display: block;"
        :src="gallery.pictures_urls[0]"
        data-holder-rendered="true"
      >
      <div class="card-body">
        <router-link
          :to="{ name: 'view-gallery', params: { id: gallery.id } }"
          class="navbar-brand"
        >{{gallery.name}}</router-link>
        <div class="justify-content-between align-items-center">
          Author:
          <router-link :to="{ name: 'user-galleries', params: { id: gallery.user_id } }">{{creatorFullName}}</router-link>
          <br>
          <small class="text-muted">{{gallery.created_at}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryItem",

  props: {
    gallery: Object
  },

  computed: {
    creatorFullName() {
      return `${this.gallery.user.first_name} ${this.gallery.user.last_name}`;
    }
  },

};
</script>

<style>
</style>
