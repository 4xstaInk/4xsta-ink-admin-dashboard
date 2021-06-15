import Vue from "vue";
import VueRouter from "vue-router";
import SocialSharing from "vue-social-sharing"
import VueGitHubButtons from "vue-github-buttons"
import "vue-github-buttons/dist/vue-github-buttons.css"
import App from "./App.vue";
import '@/assets/scss/white-dashboard.scss';
import '@/assets/css/nucleo-icons.css';
import "@/assets/demo/demo.css";

import axios from 'axios'
import VueAxios from 'vue-axios'

// Moment
import VueMoment from 'vue-moment'

import VueModalTor from "vue-modaltor/dist/vue-modaltor.common";
import "vue-modaltor/dist/vue-modaltor.css";

import VuePaginate from 'vue-paginate'


import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import RTLPlugin from "./RTLPlugin";
import Notify from "@/components/NotificationPlugin";
import i18n from "./i18n"
import SideBar from "@/components/SidebarPlugin";


Vue.config.productionTip = false;

// router setup
import routes from "./router";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active"
});

Vue.use(VueRouter);
Vue.use(SocialSharing);
Vue.use(VueGitHubButtons, { useCache: true });
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(RTLPlugin);
Vue.use(SideBar);
Vue.use(Notify);
Vue.use(VueAxios, axios);
Vue.use(VueMoment);
Vue.use(VuePaginate);
Vue.use(VueModalTor, { 
  bgOverlay: "rgb(0, 77, 77, 0.7)",
  bgPanel: "#fff"
  // add custome options
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
