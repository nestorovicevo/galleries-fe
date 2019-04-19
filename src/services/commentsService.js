import axios from 'axios'

class CommentsService {
  createComment(comment, galleryId) {
    return axios.post(`http://127.0.0.1:8000/api/galleries/${galleryId}/comments`, comment)
      .then(response => response.data)
  }

  deleteComment(commentId) {
    return axios.delete(`http://127.0.0.1:8000/api/comments/` + commentId)
  }
}
export const commentsService = new CommentsService()