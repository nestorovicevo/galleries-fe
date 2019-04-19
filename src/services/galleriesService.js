import axios from 'axios'

class GalleriesService {
  getGalleries(page = 1, term = '', userId = '') {
    return axios.get('http://localhost:8000/api/galleries?page=' + page + '&term=' + term + '&user_id=' + userId)
      .then(response => response.data)
  }

  createGallery(gallery) {
    return axios.post('http://127.0.0.1:8000/api/galleries', gallery)
  }

  getGalleryById(id) {
    return axios.get('http://127.0.0.1:8000/api/galleries/' + id)
      .then(response => response.data)
  }

  deleteGallery(galleryId) {
    return axios.delete('http://127.0.0.1:8000/api/galleries/' + galleryId)
  }

  updateGallery(galleryId, gallery) {
    return axios.put('http://127.0.0.1:8000/api/galleries/' + galleryId, gallery)
      .then(response => response.data)
  }
}
export const galleriesService = new GalleriesService()