<template>
  <div class="container">
    <div class="form-group">
      <label for="comment">Comment:</label>
      <input type="text" v-model="comment.text" class="form-control" rows="5" id="text" name="text">
    </div>
    <button @click="addComment" class="btn btn-primary">Add comment</button>
  </div>
</template>

<script>
import { commentsService } from "../services/commentsService";

export default {
  name: "CreateComment",

  data() {
    return {
      comment: {
        creator_id: 2, //TODO refactor
        text: ""
      }
    };
  },

  computed: {
    galleryId() {
      return this.$route.params.id;
    }
  },

  methods: {
    async addComment() {
      try {
        const comment = await commentsService.createComment(this.comment, this.galleryId);
        this.$emit('created-comment', comment)
        this.comment.text = ''
      } catch (error) {
        alert(error.response.data.message)
        console.log(error); //eslint-disable-line
      }
    }
  }
};
</script>