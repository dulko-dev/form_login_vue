import Vue from "vue";
import App from "./components/App.vue";


Vue.config.ProductionTIP = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
