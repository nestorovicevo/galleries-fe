import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import NavBar from "./components/NavBar.vue";
import { authService } from './services/authService'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


Vue.component('nav-bar', NavBar)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated) {
    next('/login')
  } else {
    authService.setAxiosDefaultAuthorizatonHeader()
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
