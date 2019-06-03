import Vue from "vue";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import App from "./App.vue"
import router from "./router"
import "./registerServiceWorker"
// dizemos ao Vue para importá-lo
Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
