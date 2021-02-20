import Vue from "vue";
import VueRouter from "vue-router";
import ReadView from "../views/read.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "category",
	},
	{
		path: "/tag/:slug/",
		name: "category",
	},
	{
		path: "/author/:slug/",
		name: "category",
	},
	{
		path: "/:slug",
		name: "read",
		component: ReadView,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	if (window.animationRunning == true) {
		next(false);
	} else {
		document.title = "蚊BloG";
		next();
	}
});

export default router;
