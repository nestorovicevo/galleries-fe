<template>
  <div class="media">
    <div class="media-body">
      <h5 class="mt-0">
        <strong>{{authorFullName}}</strong>
      </h5>
      <div class="d-flex justify-content-between">
        <p>{{comment.text}}</p>
        <button v-show="isCommentOwner" @click="deleteComment" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from "../services/authService";

export default {
  name: "CommentItem",

  props: {
    comment: Object,
    isGalleryOwner: Boolean
  },

  computed: {
    isCommentOwner() {
      return this.comment.creator_id == authService.getLoggedInUserId();
    },

    authorFullName() {
      return `${this.comment.creator.first_name} ${
        this.comment.creator.last_name
      }`;
    }
  },

  methods: {
    deleteComment() {
      this.$emit("deleted-comment", this.comment.id);
    }
  }
};
</script>