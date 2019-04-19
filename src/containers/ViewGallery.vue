<template>
  <div>
    <nav-bar/>
    <div class="container">
      <div class="d-flex justify-content-end mt-1">
        <button v-show="isGalleryOwner" class="btn btn-danger mr-3" @click="deleteGallery">Delete</button>
        <button v-show="isGalleryOwner" class="btn btn-success">
          <router-link
            :to="{ name: 'edit-gallery', params: { id: this.galleryId } }"
            style="color:white"
          >Edit</router-link>
        </button>
      </div>
      <h3>{{gallery.name}}</h3>
      <h4>
        <router-link
          :to="{ name: 'user-galleries', params: { id: gallery.user_id } }"
        >{{creatorFullName}}</router-link>
      </h4>
      <p>{{gallery.created_at}}</p>

      <p>{{gallery.description}}</p>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div
            v-for="(link, index) in gallery.pictures_urls"
            v-bind:key="index"
            class="carousel-item"
            :class="[index === 0 ? 'active' : '']"
          >
            <a :href="link" target="_blank">
              <img class="d-block w-100" :src="link" alt="First slide">
            </a>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>

      <comments-list :comments="gallery.comments" @deleted-comment="deleteComment"/>

      <create-comment @created-comment="addComment"/>
    </div>
  </div>
</template>

<script>
import { galleriesService } from "../services/galleriesService";
import { commentsService } from "../services/commentsService";
import CommentsList from "../components/CommentsList";
import CreateComment from "../components/CreateComment";
import { authService } from '../services/authService';

export default {
  name: "ViewGallery",

  components: {
    CommentsList,
    CreateComment
  },

  data() {
    return {
      gallery: {
        name: "",
        created_at: "",
        user: {
          first_name: "",
          last_name: ""
        },
        comments: []
      }
    };
  },

  computed: {
    isGalleryOwner() {
      return this.gallery.user.id == authService.getLoggedInUserId()
    },

    galleryId() {
      return this.$route.params.id;
    },

    creatorFullName() {
      return `${this.gallery.user.first_name} ${this.gallery.user.last_name}`;
    }
  },

  async created() {
    this.fetchGallery();
  },

  methods: {
    async fetchGallery() {
      try {
        this.gallery = await galleriesService.getGalleryById(this.galleryId);
      } catch (error) {
        alert(error.response.data.message);
        console.log(error); //eslint-disable-line
      }
    },

    addComment(comment) {
      this.gallery.comments.push(comment);
    },

    async deleteComment(commentId) {
      if (confirm("Do you really want to delete?")) {
        try {
          await commentsService.deleteComment(commentId);
          this.gallery.comments = this.gallery.comments.filter(
            comment => comment.id !== commentId
          );
        } catch (error) {
          alert(error.response.data.message);
          console.log(error); //eslint-disable-line
        }
      }
    },

    async deleteGallery() {
      if (confirm("Do you really want to delete?")) {
        try {
          await galleriesService.deleteGallery(this.galleryId);
          this.navigateToHome();
        } catch (error) {
          alert(error.response.data.message);
          console.log(error); //eslint-disable-line
        }
      }
    },
    navigateToHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
