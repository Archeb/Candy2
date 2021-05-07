<template>
	<body>
		<div ref="container" class="container" @scroll="containerScroll">
			<BeanMain :class="{ 'bean-main-mini': isBeanMini }" ref="BeanMain" />
			<div class="contained-containers" ref="containedContainers" :style="{ opacity: newOpacity, visibility: containedContainersVisibility }">
				<ContainedBeans ref="cb1" :categoryData="categoryData.cb1" style="transform: translate(0px, 0vh);" />
				<ContainedBeans ref="cb2" :categoryData="categoryData.cb2" style="transform: translate(0px, 100vh);" />
			</div>
		</div>
		<transition v-on:leave="modalLeave">
			<router-view />
		</transition>
	</body>
</template>

<script>
import Vue from "vue";
import BeanMain from "./components/beans/bean-main.vue";
import ContainedBeans from "./components/beans/contained-beans.vue";
import horizontalWheel from "./plugins/horwheel-plugin.js";
import dataProvider from "./data.js";
Vue.use(dataProvider);
const hideTags = ["about"];

export default {
	components: {
		BeanMain,
		ContainedBeans,
	},
	mounted: function() {
		window.addEventListener("resize", this.resizeHandler);
		this.resizeHandler();
		this.detectGPU();
		horizontalWheel(this.$refs.container);
		if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
			document.querySelector(".contained-containers").style.marginLeft = "0px";
		}

		Vue.set(this.categoryData, this.currentCb, []);
		this.$EventBus.$on("addCategoryData", (newData) => {
			if (newData.length == 0) {
				this.noMoreLoads = true;
				return;
			}
			let dynamicAnimationDelay = 0;
			newData.forEach((e) => {
				//隐藏的tag只能通过指定url进入
				if (e.tags.some((el) => hideTags.indexOf(el.slug) != -1 && this.$route.params.slug != el.slug)) e.hidden = true;
				e.dynamicAdded = false; // 禁用动画，测试
				if (!e.hidden) {
					e.dynamicAnimationDelay = dynamicAnimationDelay;
					dynamicAnimationDelay += 150;
				}
			});
			this.categoryData[this.currentCb] = this.categoryData[this.currentCb].concat(newData);
			// 计算给滚动的留白
			setTimeout(() => {
				let calcWidth = window.innerWidth - (this.$refs[this.currentCb].$el.clientWidth + window.innerWidth * 0.05 + 70);
				calcWidth = calcWidth <= 0 ? "5vw" : calcWidth + "px";
				this.$refs[this.currentCb].$el.style.setProperty("--beanSpaceWidth", calcWidth);
			}, 1);
		});
		this.$EventBus.$on("newCategory", (newData) => {
			window.loadFromList = true;
			let dynamicAnimationDelay = 300;
			newData.forEach((e) => {
				//隐藏的tag只能通过指定url进入
				if (e.tags.some((el) => hideTags.indexOf(el.slug) != -1 && this.$route.params.slug != el.slug)) e.hidden = true;
				e.dynamicAdded = false; // 禁用动画，测试
				if (!e.hidden) {
					e.dynamicAnimationDelay = dynamicAnimationDelay;
					dynamicAnimationDelay += 150;
				}
			});
			this.currentPage = 1;
			this.noMoreLoads = false;
			let anotherCb = this.currentCb == "cb1" ? "cb2" : "cb1"; //判断哪个是当前容器元素
			window.animationRunning = true;
			if (this.mobileMode) {
				/* 移动端动画 */
				Vue.set(this.categoryData, anotherCb, newData);
				this.$refs.container.scrollTo({ behavior: "smooth", top: 0 });
				this.$refs[this.currentCb].$el.style.opacity = "0";
				this.$refs[this.currentCb].$el.style.zIndex = "0";
				this.$refs[anotherCb].$el.style.opacity = "1";
				this.$refs[anotherCb].$el.style.zIndex = "1";
				setTimeout(() => {
					Vue.set(this.categoryData, this.currentCb, []);

					this.currentCb = anotherCb;
					window.animationRunning = false;
				}, 300);
			} else {
				/* PC版动画 */
				let leftTime = 0;
				/* 如果导航菜单还不是缩小贴靠状态则滚动至缩小贴靠状态 */
				if (this.isBeanMini == false) {
					this.isBeanMini = true;
					this.$refs.BeanMain.$el.classList.add("bean-main-mini");
					this.$refs.container.scrollTo({ behavior: "smooth", left: Math.floor(window.innerWidth * 0.45 - 99) });
					// 近似地取距离作为滚动时间
					leftTime = Math.floor(window.innerWidth * 0.45 - 99) - this.$refs.container.scrollLeft;
				}
				setTimeout(() => {
					this.$refs[this.currentCb].$el.style.transition = "transform 0.6s";
					this.$refs[this.currentCb].$el.style.transform = "translate(0,-100vh)";
					// 添加数据
					Vue.set(this.categoryData, anotherCb, newData);
					let leftWidth = -(window.innerWidth / 2 - 100 - this.$refs.container.scrollLeft - window.innerWidth * 0.05);
					this.$refs[anotherCb].$el.style.transform = "translate(" + leftWidth + "px,100vh)";
					setTimeout(() => {
						this.$refs[anotherCb].$el.style.transition = "transform 0.6s";
						this.$refs[anotherCb].$el.style.transform = "translate(" + leftWidth + "px,0vh)";
						setTimeout(() => {
							Vue.set(this.categoryData, this.currentCb, []);
							this.$refs[this.currentCb].$el.style.removeProperty("transition");
							this.$refs[this.currentCb].$el.style.transform = "translate(0,100vh)";
							//计算给滚动的留白
							let calcWidth = window.innerWidth - (this.$refs[anotherCb].$el.clientWidth + window.innerWidth * 0.05 + 70);
							calcWidth = calcWidth <= 0 ? "5vw" : calcWidth + "px";
							this.$refs[anotherCb].$el.style.setProperty("--beanSpaceWidth", calcWidth);
							this.$refs[this.currentCb].$el.style.removeProperty("--beanSpaceWidth");
							this.$refs[anotherCb].$el.style.removeProperty("transition");
							this.$refs.container.scrollLeft = Math.floor(window.innerWidth * 0.45 - 99);
							this.$refs[anotherCb].$el.style.transform = "translate(0px,0vh)";
							this.currentCb = anotherCb;
							window.animationRunning = false;
						}, 600);
					}, 50);
				}, leftTime);
			}
		});

		// 如果当前目录是文章则加载首页数据
		let loadPath = this.$route.name == "read" ? "/" : this.$route.path;
		// 加载分类目录数据
		this.getCategoryData(loadPath).then((newData) => {
			this.$EventBus.$emit("addCategoryData", newData);
			// 如果不是首页则自动展开
			if (this.$route.path !== "/") {
				setTimeout(() => {
					this.scrollToArticle();
				}, 1);
			}
		});
	},
	data: () => {
		return {
			isBeanMini: false,
			mobileMode: false,
			noMoreLoads: false,
			lowPerformance: false,
			newOpacity: 0,
			containedContainersVisibility: "hidden",
			categoryData: {},
			beanSpaceWidth: "0px",
			currentCb: "cb1",
			currentPage: 1,
		};
	},
	methods: {
		resizeHandler: function() {
			this.mobileMode = window.innerWidth < 991 ? true : false;
			this.isBeanMini = this.mobileMode;
		},
		scrollToArticle: function() {
			window.animationRunning = true;
			this.isBeanMini = true;
			this.$refs.container.scrollTo({ behavior: "smooth", left: Math.floor(window.innerWidth * 0.45 - 99) });
			setTimeout(() => {
				window.animationRunning = false;
			}, 600);
		},
		modalLeave: function(el) {
			el.style.backgroundColor = "rgba(0, 0, 0, 0)";
			setTimeout(() => {
				el.style.visibility = "hidden";
			}, 500);
			el.querySelector(".bean-read").style.transform = "translate(0,-100vh)";
		},
		containerScroll: function(e) {
			if (this.mobileMode) {
				if (e.target.scrollTop + window.innerHeight >= this.$refs[this.currentCb].$el.parentElement.offsetTop + this.$refs[this.currentCb].$el.clientHeight - 40 && !this.noMoreLoads) {
					//滑到底了 而且还有剩下的内容
					this.currentPage++;
					this.getCategoryData(this.$route.path + "page/" + this.currentPage).then((newData) => {
						this.$EventBus.$emit("addCategoryData", newData);
					});
				}
				return;
			}
			if (e.target.scrollLeft >= Math.floor(window.innerWidth * 0.45 - 100)) {
				this.isBeanMini = true;
			} else {
				this.isBeanMini = false;
			}
			this.newOpacity = (e.target.scrollLeft / window.innerWidth) * 3;
			if (this.newOpacity == 0) {
				this.containedContainersVisibility = "hidden";
			} else {
				this.containedContainersVisibility = "visible";
			}
			if (e.target.scrollLeft + window.innerWidth >= this.$refs[this.currentCb].$el.parentElement.offsetLeft + this.$refs[this.currentCb].$el.clientWidth - 40 && !this.noMoreLoads) {
				//滑到底了 而且还有剩下的内容
				this.currentPage++;
				this.getCategoryData(this.$route.path + "page/" + this.currentPage).then((newData) => {
					this.$EventBus.$emit("addCategoryData", newData);
				});
			}
		},
		detectGPU: function() {
			let canvas = document.createElement("canvas");
			let gl = canvas.getContext("experimental-webgl");
			let debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

			let highEndGraphicsCards = ["apple", "vega", "rx", "radeon pro", "pro duo", "vii", "r9", "titan", "rtx", "mx 350", "mx350", "gtx"];
			if (
				!highEndGraphicsCards.some((card) => {
					return (
						gl
							.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
							.toLowerCase()
							.indexOf(card) >= 0
					);
				}) &&
				!this.mobileMode // 手机浏览器自带优化
			) {
				this.lowPerformance = true;
				setTimeout(() => {
					console.log("您浏览本网站使用的显卡是：" + gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
					console.log("如果这是您的全新高性能独显，请留言给我更新显卡列表");
					this.$Notify("提示", "已启用节能模式，按F12查看详细信息", "background-color:#fb7299");
				}, 100);
			}
		},
	},
	watch: {
		$route(to, from) {
			if (to.name != "read" && from.name != "read") {
				this.getCategoryData(to.path).then((newData) => {
					this.$EventBus.$emit("newCategory", newData);
				});
			}
		},
	},
};
</script>

<style lang="less">
@font-face {
	font-family: "iconfont"; /* project id 2102450 */
	src: url("//at.alicdn.com/t/font_2102450_3a3j75o7rrp.eot");
	src: url("//at.alicdn.com/t/font_2102450_3a3j75o7rrp.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_2102450_3a3j75o7rrp.woff2") format("woff2"), url("//at.alicdn.com/t/font_2102450_3a3j75o7rrp.woff") format("woff"), url("//at.alicdn.com/t/font_2102450_3a3j75o7rrp.ttf") format("truetype"), url("//at.alicdn.com/t/font_2102450_3a3j75o7rrp.svg#iconfont") format("svg");
}
html {
	height: 100%;
	position: absolute;
}
body {
	margin: 0;
	--mybg: url(./assets/img/bg_pc.png);
	font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
	background-image: var(--mybg);
	background-size: cover;
	background-position: center;
	height: 100%;
	background-attachment: fixed;
	width: 100vw;
	overflow: hidden;
}

a {
	text-decoration: none;
	color: #8172ef;
}
.container {
	display: flex;
	overflow-x: scroll;

	color: #333333;
	height: 100%;
	align-items: center;
	overflow-y: hidden;

	.bean-space {
		width: var(--beanSpaceWidth);
		height: 80px;
		flex-shrink: 0;
	}

	.contained-containers {
		height: 100%;
		opacity: 0;
		transform: translate(0, 0); /* 魔法 */
		will-change: transform;
		display: flex;
		flex-direction: column;

		.contained-beans {
			height: 100%;
			display: flex;
			transition-timing-function: cubic-bezier(0.68, 0, 0.33, 1) !important;
			position: fixed;
			align-items: center;
		}
	}
}

.bg-mask {
	height: 100%;
	width: 100vw;
	left: 0;
	position: absolute;
	top: 0;
	z-index: 1;
	pointer-events: none;
}

.bean {
	background-color: rgba(223, 242, 255, 0.5);
	box-shadow: -5px -5px 10px rgba(32, 32, 32, 0.1), 5px 5px 10px rgba(32, 32, 32, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	flex-shrink: 0;
}

::-webkit-scrollbar {
	width: 12px;
}

::-webkit-scrollbar-thumb {
	border-radius: 12px;
	border: 5px solid transparent;
	background-color: rgba(0, 0, 0, 0.2);
	transition: all 0.3s;
}

::-webkit-scrollbar-thumb:hover {
	background-color: rgba(0, 0, 0, 0.4);
}

::-webkit-scrollbar-thumb:active {
	background-color: rgba(0, 0, 0, 0.5);
}

@media (max-width: 991px) {
	body {
		width: 100vw;
		--mybg: url(./assets/img/bg_mobile.png);
		height: 100%;
	}
	.container {
		flex-direction: column;
		overflow-y: scroll;
		overflow-x: hidden;

		.contained-containers {
			margin-top: 40px;

			height: auto;
			margin-left: 9px; /* scrollBar * 0.5 */
			flex-direction: row;
			transform: translate(0, 0);
			width: auto;
			opacity: 1 !important;
			visibility: visible !important;

			.contained-beans {
				transition: all 0.3s;
				height: auto;
				flex-direction: column;
				width: 100%;
				position: absolute;
				justify-content: flex-start;
				align-items: center;
				transform: none !important;
			}
		}
	}

	.bean-main-mini {
		flex-direction: row;
		margin-left: unset;
		display: flex;
		width: 90vw;
		top: 5%;
		align-items: center;
		height: 70px;

		.avatar {
			margin-top: 0;
			margin-left: 8px;

			img {
				width: 48px;
				height: 48px;
			}
			.search-btn {
				top: 11px;
				width: 48px;
				height: 48px;
			}
		}

		.links {
			flex-direction: row;
			width: 100%;
		}
	}

	.bean-article {
		margin-left: unset;
		margin-top: 20px;
		height: 72vw;
		width: 90vw;

		.article-title {
			font-size: 20px;
		}

		.article-content {
			padding: 0 20px;
			font-size: 0.8em;
		}
	}

	.bean-space {
		width: 1px !important;
		height: 40px !important;
	}
}
@supports not (backdrop-filter: blur(15px)) {
	.bean {
		background-color: rgba(223, 242, 255, 0.8);
	}
	.article-banner {
		background-color: rgba(255, 255, 255, 0.95) !important;
	}
}
</style>
