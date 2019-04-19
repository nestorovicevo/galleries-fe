import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './containers/Auth/Login.vue'
import Register from './containers/Auth/Register.vue'
import Galleries from './containers/Galleries.vue'
import CreateGallery from './containers/CreateGallery.vue'
import ViewGallery from './containers/ViewGallery.vue'
import EditGallery from './containers/EditGallery.vue'
import UserGalleries from './containers/UserGalleries.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Galleries, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/create', component: CreateGallery, name: 'create', meta: { requiresAuth: true } },
  { path: '/galleries/:id', component: ViewGallery, name: 'view-gallery', meta: { requiresAuth: true } },
  { path: '/edit-gallery/:id', component: EditGallery, name: 'edit-gallery', meta: { requiresAuth: true } },
  { path: '/my-galleries', component: UserGalleries, name: 'my-galleries', meta: {requiresAuth: true} },
  { path: '/authors/:id', component: UserGalleries, name: 'user-galleries', meta: {requiresAuth: true} }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})