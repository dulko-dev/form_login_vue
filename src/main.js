import Vue from "vue";
import App from "./components/App.vue";
import  { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.ProductionTIP = false 

new Vue({
  render: (h) => h(App),
}).$mount("#app");
