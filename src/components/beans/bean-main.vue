<template>
	<div class="bean bean-main" :class="{ 'no-backdrop-blur': this.$parent.lowPerformance }">
		<div class="avatar">
			<img src="https://img.qwq.globalslb.net/icon-circle.png" />
		</div>
		<div class="blog-name">贫困<span class="small">の</span>蚊子</div>
		<div class="links">
			<router-link class="link-item" :class="{ 'link-item-selected': this.$route.path === '/' }" to="/" v-on:click.native="scrollIndexArticle">
				<div class="link-container"><span class="link-icon"></span><span class="link-text">&nbsp;文章</span></div>
			</router-link>
			<router-link class="link-item" to="/links">
				<div class="link-container">
					<span class="link-icon">&#xe614;</span>
					<span class="link-text">&nbsp;链接</span>
				</div>
			</router-link>
			<router-link class="link-item" :class="{ 'link-item-selected': this.$route.path === '/tag/travel/' }" to="/tag/travel/">
				<div class="link-container"><span class="link-icon"></span><span class="link-text">&nbsp;旅行</span></div>
			</router-link>
			<router-link class="link-item" :class="{ 'link-item-selected': this.$route.path === '/tag/tech/' }" to="/tag/tech/">
				<div class="link-container"><span class="link-icon"></span><span class="link-text">&nbsp;技术</span></div>
			</router-link>
			<router-link class="link-item" :class="{ 'link-item-selected': this.$route.path === '/tag/about/' }" to="/tag/about/">
				<div class="link-container"><span class="link-icon"></span><span class="link-text">&nbsp;关于</span></div>
			</router-link>
		</div>
		<div class="meta-info">
			<span class="show">© Archeb 2014 - 2021<br />Made With ♥</span>
			<span class="hide">Theme Candy 2 By <a href="https://qwq.moe/">Archeb</a></span>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		about: function(e) {
			this.$Notify("提示", "还没做出来", "background-color:#fb7299");
		},
		scrollIndexArticle: function() {
			if (this.$route.path == "/" && this.$parent.isBeanMini == false) {
				this.$parent.scrollToArticle();
			}
		},
	},
};
</script>
<style lang="less">
.bean-main {
	width: 200px;
	height: 600px;
	margin-left: calc(50% - 100px);
	left: 5%;
	user-select: none;
	-moz-user-select: none;
	will-change: backdrop-filter;
	-webkit-user-select: none;
	border-radius: 100px !important;
	position: sticky;
	overflow: hidden;
	transition: all 0.3s;
	z-index: 2;

	.avatar {
		display: flex;
		justify-content: center;
		margin-top: 25px;
		transition: all 0.3s;

		img {
			transition: all 0.3s;
			width: 150px;
			height: 150px;
			border: 3px solid rgba(245, 245, 245, 0.2);
			box-shadow: 0 0 10px rgba(32, 32, 32, 0.1);
			border-radius: 50%;
			margin: 0 auto;
		}
	}

	.blog-name {
		margin-top: 10px;
		text-align: center;
		font-size: 30px;
		height: 44px;
		overflow: hidden;
		transition: all 0.3s;
		text-shadow: 1px 1px rgba(32, 32, 32, 0.1);

		.small {
			font-size: 75%;
		}
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px 0;
		padding: 0 10px;

		.link-item {
			cursor: pointer;
			color: inherit;
			border-radius: 100px;
			margin: 7px 0;
			padding: 7px 0;
			width: 100%;
			text-align: center;
			font-size: 18px;
			font-family: "iconfont";
			transition: all 0.3s;

			.link-container {
				transition: all 0.3s;
			}

			.link-text {
				overflow: hidden;
				transition: all 0.3s;
			}

			&:hover {
				background-color: rgba(254, 254, 254, 0.3);
				transform: translate(0, -2px);
				box-shadow: 0 0 5px rgba(32, 32, 32, 0.1);
			}

			&:active {
				.link-container {
					transform: scale(0.9);
				}
			}
		}

		.link-item-selected {
			background-color: transparent;
			box-shadow: none;
		}
	}

	.meta-info {
		font-size: 10px;
		margin-top: 20px;
		padding: 0 20px;
		text-align: center;
		color: rgba(0, 0, 0, 0.7);

		a {
			border-bottom: 1px solid #8172ef;
		}

		.show {
			display: block;
			transition: all 0.3s;
			opacity: 1;
		}

		.hide {
			display: block;
			opacity: 0;
			transition: all 0.3s;
			transform: translate(0, -34px);
		}

		&:hover {
			.hide {
				opacity: 1;
			}

			.show {
				opacity: 0;
			}
		}
	}
}
.bean-main-mini {
	width: 70px;
	height: 330px;

	.avatar {
		margin-top: 10px;

		img {
			width: 50px;
			height: 50px;
		}
	}

	.blog-name {
		height: 0px;
		opacity: 0;
		font-size: 0px;
		margin-top: 0px;
	}

	.link-text {
		display: none;
	}

	.meta-info {
		display: none;
	}

	.links {
		margin: 7px 0;

		.link-item {
			&:hover {
				transform: translate(0);
				background-color: transparent;
				transform: translate(0, 0);
				box-shadow: 0 0 0px rgba(32, 32, 32, 0.1);
			}

			&:active {
				transform: scale(0.9);

				.link-container {
					transform: scale(0.8);
				}
			}
		}

		.link-item-selected {
			background-color: rgba(254, 254, 254, 0.3) !important;
			box-shadow: 0 0 5px rgba(32, 32, 32, 0.1) !important;
		}
	}
}
.no-backdrop-blur {
	backdrop-filter: none !important;
	background-color: rgba(223, 242, 255, 0.8) !important;
}
</style>
