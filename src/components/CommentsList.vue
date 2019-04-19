<template>
  <div class="container">
    <div>
      <comment-item
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
        :is-gallery-owner="isGalleryOwner"
        @deleted-comment="deleteComment"
      />
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";

export default {
  name: "CommentsList",

  components: {
    CommentItem
  },

  props: {
    comments: Array,
    isGalleryOwner: Boolean
  },

  methods: {
    deleteComment(commentId) {
      this.$emit("deleted-comment", commentId);
    }
  }
};
</script>
