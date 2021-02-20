import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Notify from "@/plugins/Notify";
import VueAppend from "vue-append";

Vue.config.productionTip = false;
document.title = "Candy 2";
const EventBus = new Vue();
Vue.prototype.$EventBus = EventBus;
window.vueRouter = router;
new Vue({
	router,
	render: (h) => h(App),
}).$mount("body");
Vue.use(VueAppend);
Vue.use(Notify);
