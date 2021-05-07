<template>
	<div class="modal" ref="modal">
		<!--
		<div class="bean bean-toc">AAAAA</div>
		-->
		<div class="bean bean-read" :class="{ 'no-backdrop-blur-read': this.$parent.lowPerformance }" style="transform: translate(0px, 100vh);">
			<div class="modal-close" v-on:click="exitModal">×</div>
			<div class="article-cover" :style="'background-image: url(\'' + articleData.feature_image + '\');'">
				<div class="article-category">
					<div class="category-item">
						<div class="item-text"> {{ articleData.postTime }}</div>
					</div>
					<div v-for="tag in articleData.tags" :key="tag.icon" class="category-item">
						<div class="item-text">{{ tag.name }}</div>
					</div>
				</div>
				<div class="article-title">{{ articleData.title }}</div>
			</div>
			<div class="article-banner">
				<div class="banner-progressbar"></div>
				<div class="banner-author">
					<div class="author-avatar">
						<img :src="articleData.primary_author.profile_image" />
					</div>
					<span>{{ articleData.primary_author.name }}</span>
					<span class="publish-time">{{ articleData.published_at }}</span>
				</div>
				<div class="banner-tools">阅读共需 {{ articleData.reading_time }} 分钟</div>
			</div>
			<div v-html="articleData.html" class="article-content"></div>
			<div class="article-comment" id="gitalk-container">
				<!--
				<form class="comment-send">
					<textarea class="send-content" v-model="newComment.content" placeholder="快来写下你成为女装大佬的宣言吧！" rows="8"></textarea>
					<div class="send-button" v-on:click="sendComment">&#xe643;</div>
					<div class="extra-info">
						<span class="extra-icon">&#xe66e;</span>
						<input class="extra-name" v-model="newComment.name" placeholder="名字" />
						<span class="extra-icon extra-icon-mail">&#xe608;</span>
						<input class="extra-mail" v-model="newComment.mail" placeholder="邮箱" />
						<span class="extra-icon">&#xe671;</span>
						<input class="extra-site" v-model="newComment.site" placeholder="站点" />
					</div>
				</form>
				<div v-for="comment in comments" :key="comment.id" class="comment-view">
					<div class="view-item">
						<div class="item-info">
							<div class="info-author">
								<div class="author-avatar">
									<img :src="comment.avatar" />
								</div>
								<div class="author-metas">
									<div class="author-name">{{ comment.user }}</div>
									<div class="comment-time">{{ comment.time }}</div>
								</div>
							</div>
						</div>
						<div v-html="comment.content" class="item-content"></div>
					</div>
				</div>
				-->
			</div>
		</div>
		<CoolLightBox :items="imageItems" :index="imageIndex" @close="imageIndex = null"> </CoolLightBox>
	</div>
</template>
<script>
import md5 from "../plugins/md5.js";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import "highlight.js/styles/agate.css";
import "owo/dist/OwO.min.css";
import "owo/dist/OwO.min.css";
import OwO from "owo/dist/OwO.min.js";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
const highlightjs = require("highlight.js");
export default {
	components: {
		CoolLightBox,
	},
	data() {
		this.getCategoryData(this.$route.path).then((newData) => {
			this.articleData = newData;
			// 把图片添加进灯箱
			setTimeout(() => {
				let imgIndex = 0;
				document.querySelectorAll(".modal .bean-read .article-content .kg-image-card").forEach((imgCard) => {
					let imgTitle = imgCard.querySelector("figcaption") ? imgCard.querySelector("figcaption").innerHTML : "";
					this.imageItems.push({ src: imgCard.querySelector("img").src, title: imgTitle });
					imgCard.querySelector("img").dataset.imgIndex = imgIndex;
					imgCard.querySelector("img").addEventListener("click", (e) => {
						this.imageIndex = e.target.dataset.imgIndex;
					});
					imgIndex++;
				});
			}, 1);
			document.title = this.articleData.title;
			var gitalk = new Gitalk({
				clientID: "63db5c393a7f6b8c649c",
				clientSecret: "ca591fe56242d585e9b2eedd1299f65439349af5",
				repo: "Blog-Comments",
				owner: "Archeb",
				admin: ["Archeb"],
				proxy: "https://green-term-a676.archeb.workers.dev/corsproxy/?apiurl=https://github.com/login/oauth/access_token",
				id: this.articleData.slug, // Ensure uniqueness and length less than 50
				distractionFreeMode: false, // Facebook-like distraction free mode
			});
			gitalk.render("gitalk-container");
			setTimeout(this.showModal, 1);
		});
		return {
			articleData: { feature_image: "", primary_author: {} },
			imageItems: [],
			imageIndex: null,
		};
	},
	mounted: function() {},
	methods: {
		sendComment: function(e) {
			var d = new Date();
			this.comments.unshift({
				id: this.comments.length + 1,
				avatar: "https://www.gravatar.com/avatar/" + md5(this.newComment.mail) + "?s=64&r=X&d=",
				user: this.newComment.name,
				time: d.getMonth() + 1 + "月" + d.getDate() + "日",
				content: "<p>" + this.newComment.content + "</p>",
			});
		},
		showModal: function() {
			setTimeout(() => {
				let ElOwOBtnTemplate = document.createElement("template");
				ElOwOBtnTemplate.innerHTML = `<button class="gt-btn gt-btn-preview OwO"><span class="gt-btn-text">OωO</span></button>`;
				let ElOwOBtn = document.querySelector(".gt-header-controls").appendChild(ElOwOBtnTemplate.content.firstChild);
				ElOwOBtn.addEventListener("click", (e) => {
					if (ElOwOBtn.classList.value.indexOf("OwO-open") !== -1) {
						document.querySelector(".article-comment").style.padding = "0 40px 160px";
					} else {
						document.querySelector(".article-comment").style.padding = "0 40px 20px";
					}
				});
				document.querySelectorAll(".gt-btn").forEach((btn) =>
					btn.addEventListener("click", (e) => {
						var event = new InputEvent("input");
						document.querySelector(".gt-header-textarea").dispatchEvent(event);
					})
				);
				var OwO_demo = new OwO({
					logo: "OωO表情",
					container: ElOwOBtn,
					target: document.querySelector(".gt-header-textarea"),
					api: "/js/OwO.json",
					position: "down",
					width: "415px",
					maxHeight: "250px",
				});
			}, 3000);
			document.querySelectorAll(".modal .article-content pre code").forEach((block) => {
				highlightjs.highlightBlock(block);
			});
			this.$refs.modal.querySelector(".bean-read").style.display = "block";
			this.$refs.modal.style.visibility = "visible";

			setTimeout(() => {
				this.$refs.modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
				if (!this.$parent.lowPerformance && !this.$parent.mobileMode) {
					this.$refs.modal.style.backdropFilter = "blur(20px)";
				}
			}, 1);
			this.$refs.modal.querySelector(".bean-read").scrollTop = 0;
			this.$refs.modal.querySelector(".bean-read").style.transform = "translate(0,0)";
			document.querySelector(".modal").addEventListener("mousedown", (e) => {
				if (e.target.classList.contains("modal")) {
					this.exitModal();
				}
			});
			let escapeModal;
			escapeModal = (e) => {
				if (e.code == "Escape") {
					this.exitModal();
					document.documentElement.removeEventListener("keyup", escapeModal);
				}
			};
			document.documentElement.addEventListener("keyup", escapeModal);
		},
		exitModal: function() {
			if (!this.$parent.lowPerformance && !this.$parent.mobileMode) {
				this.$refs.modal.style.backdropFilter = "blur(0px)";
			}
			if (window.loadFromList) {
				this.$router.go(-1);
			} else {
				this.$router.push("/");
			}
		},
	},
};
</script>
<style lang="less">
.modal {
	background-color: rgba(0, 0, 0, 0);
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	visibility: hidden;

	overflow-y: hidden;
	transition: background-color 0.5s, backdrop-filter 0.5s;
	height: 100%;
	z-index: 3;

	::-webkit-scrollbar {
		display: none;
	}
	.modal-close {
		display: none;
		position: fixed;
		z-index: 2;
		user-select: none;
		top: 0px;
		left: 15px;
		font-size: 2em;
		text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
		color: rgba(255, 255, 255, 0.8);
	}
	.bean-toc {
		position: fixed;
		margin: 50px;
		padding: 20px;
	}
	.bean-read {
		background-color: rgba(255, 255, 255, 0.9);
		margin: 50px auto;
		width: 800px;
		overflow-y: scroll;
		overflow-x: hidden;
		height: calc(100vh - 100px);
		transition: all 0.5s;

		transition-timing-function: cubic-bezier(0.68, 0, 0.33, 1) !important;
		scrollbar-width: none;
		box-sizing: border-box;

		.article-title {
			color: #f0f0f0;
			padding: 25px 30px 40px;
			text-shadow: 0 0 5px rgba(35, 35, 35, 0.5), 0 0 5px rgba(35, 35, 35, 0.5);
			font-size: 32px;
			overflow-x: scroll;
			white-space: nowrap;
			background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6));
		}

		.article-cover {
			transition: all 0.5s;
			background-position: center;
			display: flex;
			background-size: cover;
			flex-direction: column;
			height: 500px;
			justify-content: space-between;
			overflow: hidden;

			.article-category {
				display: flex;
				user-select: none;
				-moz-user-select: none;
				-webkit-user-select: none;
				align-items: center;
				padding: 25px 30px;
				flex-direction: row-reverse;

				.category-item {
					display: flex;
					align-items: center;
					background-color: rgba(255, 255, 255, 0.8);
					padding: 2px 5px;
					height: 19px;
					border-radius: 5px;
					margin-left: 8px;
					backdrop-filter: blur(5px);
					box-shadow: 0 0 10px rgba(32, 32, 32, 0.2);

					.item-text {
						font-size: 13px;
						//font-weight: bold;
						font-family: "iconfont";
						margin-top: -2px;
					}
				}
			}
		}

		.article-banner {
			display: flex;
			justify-content: space-between;
			user-select: none;
			align-items: center;
			font-size: 13px;
			box-shadow: 5px 5px 10px rgba(32, 32, 32, 0.1);
			padding: 8px 20px 8px 8px;
			position: sticky;
			top: 20px;
			margin: -25px 20px 0;
			z-index: 10;
			border-radius: 50px;
			background-color: rgba(255, 255, 255, 0.8);
			backdrop-filter: blur(30px);
			color: #363636;

			.banner-author {
				display: flex;
				align-items: center;
				font-size: 14px;

				span {
					font-weight: bold;
				}

				.author-avatar {
					margin-right: 10px;
					height: 37px;
					width: 37px;

					img {
						transition: all 0.3s;
						width: 35px;
						height: 35px;
						border: solid 1px #b9b9b9;
						box-shadow: 0 0 10px rgba(32, 32, 32, 0.1);
						border-radius: 50%;
						margin: 0 auto;
					}
				}
				.publish-time {
					margin-left: 10px;
					font-weight: 400;
					color: #7e7e7e;
				}
			}

			.banner-tools {
				color: #7e7e7e;
			}

			.banner-progressbar {
				height: 100%;
				left: 0;
				width: 0%;
				max-width: 100%;
				background-color: rgba(255, 255, 255, 0.8);
				position: absolute;
				z-index: -1;
			}
		}

		.article-content {
			font-size: 0.95em;
			line-height: 2.2;

			padding: 10px 60px 30px;
			color: #232323;
			* {
				max-width: 100%;
			}

			a {
				text-decoration: none;
				color: inherit;
				box-shadow: 0 1px 0 #3eb0ef;
				transition: box-shadow 0.3s, color 0.3s;
				box-sizing: content-box;
				display: inline-block;
				line-height: 1.5;
				&:hover {
					box-shadow: 0 1px 0 transparent;
					color: #8172ef;
				}
				&:active {
					transform: translate(-0.5px, 1px);
				}
			}

			hr {
				margin: 2em auto;
				width: 25%;
				max-width: 100%;
				border: none;
				border-top: 2px solid #b7b7b7;
			}

			table thead {
				background-color: #7c96ec;
				color: white;
			}

			table thead tr th {
				font-weight: 400;
				padding: 4px;
			}

			table tbody tr td {
				border-bottom: 1px solid #d4d4d4;
				transition: background-color 0.5s;
				padding: 5px 10px;
			}

			& > h1,
			h2,
			h3 {
				margin: 0;
				border-bottom: 2px solid #bbbbbb;
				color: #333333;
				transition: all 0.3s;
				line-height: 1.9;

				&:before {
					content: "# ";
					font-weight: lighter;
					color: #7f7f7f;
					transition: all 0.3s;
				}
			}
			& > h1 {
				font-size: 1.5rem;
			}

			blockquote {
				color: #333333;
				border-left: 5px solid #3b99f5;
				padding: 10px 20px;
				font-style: oblique;
				margin: 20px 0;
				box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
				background-color: rgba(255, 255, 255, 0.5);
				transition: all 0.3s;

				&:hover {
					box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
				}
			}

			pre {
				border-radius: 20px;
				overflow: hidden;
				box-shadow: 5px 5px 10px rgba(32, 32, 32, 0.1);
				::-webkit-scrollbar {
					height: 9px;
					width: 9px;
					background-color: transparent;
					display: block !important;
				}

				::-webkit-scrollbar-thumb {
					background-color: rgba(255, 255, 255, 0.35);
					transition: all 0.3s;
				}

				::-webkit-scrollbar-thumb:hover {
					background-color: rgba(255, 255, 255, 0.45);
				}

				::-webkit-scrollbar-thumb:active {
					background-color: rgba(255, 255, 255, 0.55);
				}

				code {
					max-height: 350px;
					margin: 0 !important;
					padding: 15px 20px !important;
				}
			}

			code {
				font-family: "monospace", Consolas, "Microsoft YaHei Light";
				font-size: 14px;
				background-color: #333333;
				color: white;
				padding: 2px 4px;
				line-height: 1.8em;
				border-radius: 3px;
				font-size: 14px;
				margin: 0 5px;
			}

			// GhostBlog 样式

			.kg-width-full {
				margin-left: -40px;
				max-width: unset;
				width: calc(100% + 80px);
			}
			.kg-image-card img {
				cursor: zoom-in;
			}
			.kg-width-wide {
				margin: 0;
			}
			figcaption {
				text-align: center;
				color: #888888;
				font-size: 0.9em;
			}
			.kg-image-card {
				text-align: center;
			}
			.kg-bookmark-card {
				width: unset;

				box-shadow: 5px 5px 10px rgba(32, 32, 32, 0.1);
				box-sizing: border-box;
				background: #fff;
				border-radius: 20px;
				overflow: hidden;
			}
			.kg-bookmark-container {
				display: flex !important;
				box-shadow: none !important;
			}
			.kg-bookmark-container:hover {
				color: unset !important;
			}
			.kg-bookmark-container:active {
				transform: none !important;
			}

			.koenig-editor__editor .kg-bookmark-container {
				display: flex;
				color: #343f44;
				text-decoration: none;
				box-shadow: none;
				min-height: 120px;
			}

			.kg-bookmark-content {
				display: block;
				flex-direction: column;
				flex-grow: 1;
				flex-basis: 100%;
				align-items: flex-start;
				justify-content: flex-start;
				padding: 20px;
			}

			.kg-bookmark-title {
				font-size: 1.3rem;
				line-height: 1.5em;
				font-weight: 600;
			}

			.kg-bookmark-description {
				display: -webkit-box;
				font-size: 0.9rem;
				line-height: 1.5em;
				margin-top: 3px;
				color: #54666d;
				font-weight: 400;
				max-height: 44px;
				overflow-y: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.kg-bookmark-thumbnail {
				position: relative;
				flex-grow: 1;
				min-width: 33%;
			}

			.kg-bookmark-thumbnail img {
				width: 100%;
				height: 100%;
				-o-object-fit: cover;
				object-fit: cover;
				position: absolute;
				top: 0;
				left: 0;
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
			}

			.kg-bookmark-metadata {
				color: #343f44;
				font-size: 1rem;
				font-weight: 500;
				display: flex;
				align-items: center;
				margin-top: 22px;
			}

			.kg-bookmark-icon {
				width: 20px;
				height: 20px;
				margin-right: 6px;
			}

			.kg-bookmark-publisher {
				display: none;
			}

			.kg-bookmark-author {
				color: #54666d;
				font-weight: 400;
			}
		}

		.article-comment {
			overflow: hidden;
			padding: 0 40px 20px;
			background: rgba(255, 255, 255, 0.8);
			border-top-right-radius: 20px;
			border-top-left-radius: 20px;
			.OwO {
				padding: 0;
				white-space: unset;
				border: none;
				border-bottom: 1px solid #6190e8 !important;
			}
			.OwO-open {
				border-bottom: none !important;
			}
			.OwO-logo {
				border: 1px solid #6190e8 !important;
				border-bottom: none !important;
				padding: 0 !important;
				line-height: unset !important;
				height: auto !important;
				color: #6190e8 !important;
				font-size: 0.75em !important;
				width: 77px;
				span {
					margin: 1em 1.25em;
					display: block;
				}
			}
			.OwO-body {
				margin-left: -338px;
				margin-top: 9px;
				border-top-right-radius: 0;
				border: 1px solid #6190e8;
			}
			.OwO-items {
				overflow-x: hidden;
				text-align: right !important;
				color: #6c6c6c;
				&::-webkit-scrollbar {
					display: block;
				}
			}
			.OwO .OwO-body .OwO-bar {
				height: unset !important;
			}
			.OwO-item img {
				max-width: unset !important;
			}
			.OwO-item {
				max-width: unset !important;
			}
			.gt-meta {
				margin: 0.2em 0 1.25em;
			}
			.gt-header-textarea {
				resize: none !important;
				max-width: 100% !important;
				box-sizing: border-box !important;
				border: none !important;
				-webkit-appearance: none !important;
				padding: 15px 20px !important;
				box-shadow: 0 2px 5px rgba(32, 32, 32, 0.02) !important;
				font-size: 13px !important;
				background-color: white !important;
				color: #6c6c6c !important;
				border-radius: 20px !important;
				font-family: sans-serif !important;
				background-size: 100px !important;
				transition: all 0.5s, background-position 0.3s, background-size 0.3s !important;
				background-image: url(../assets/img/kongou.png) !important;
				background-repeat: no-repeat !important;
				background-position: right bottom !important;
				&:focus,
				&:hover {
					box-shadow: 0 3px 5px rgba(32, 32, 32, 0.1) !important;
				}
			}
			.gt-header-preview {
				background-color: white;
				border-radius: 20px !important;
				transition: all 0.5s;
				box-shadow: 0 2px 5px rgba(32, 32, 32, 0.1) !important;
				border: none;
			}
			.gt-avatar img {
				border-radius: 100% !important;
				box-shadow: 0 3px 6px rgba(32, 32, 32, 0.05) !important;
				&:hover {
					box-shadow: 0 3px 5px rgba(32, 32, 32, 0.1) !important;
				}
			}

			.gt-container .gt-comment-content {
				background-color: white;
				border-radius: 20px !important;
				transition: all 0.5s;
				box-shadow: 0 2px 5px rgba(32, 32, 32, 0.02) !important;
				&:hover {
					box-shadow: 0 3px 5px rgba(32, 32, 32, 0.1) !important;
				}
			}
			.gt-comment-admin .gt-comment-avatar:after {
				content: "";
				background-position: -73px -52px;
				margin: 30px 0 0 -15px;
				width: 20px;
				height: 20px;
				position: absolute;
				background-image: url(../assets/img/user-auth.png);
				background-repeat: no-repeat;
			}
			.gt-btn {
				transition: all 0.3s;
			}
			.comment-send {
				.send-content {
					width: 100%;
					resize: none;
					max-width: 100%;
					box-sizing: border-box;
					border: none;
					-webkit-appearance: none;
					padding: 15px 20px;
					outline: none;
					box-shadow: 0 2px 5px rgba(32, 32, 32, 0.02);
					font-size: 13px;
					background-color: white;
					color: #6c6c6c;
					border-radius: 20px;
					font-family: sans-serif;
					background-size: 135px;
					transition: all 0.5s, background-position 0.3s, background-size 0.3s;
					background-image: url(../assets/img/kongou.png);
					background-repeat: no-repeat;
					background-position: right bottom;

					&:focus,
					&:hover {
						box-shadow: 0 3px 5px rgba(32, 32, 32, 0.1);
					}
				}

				.send-button {
					position: fixed;
					right: -3px;
					font-family: "iconfont";
					font-size: 27px;
					margin-top: -132px;
					background-color: #bdeaff;
					color: #6c6c6c;
					padding: 10px;
					border-radius: 50%;
					user-select: none;
					-moz-user-select: none;
					-webkit-user-select: none;
					border: 18px solid #f3f5f8;
					transform: scale(0);
					transition: all 0.3s;
					box-shadow: inset 0 3px 0px rgba(32, 32, 32, 0);
					cursor: pointer;

					&:active {
						box-shadow: inset 0 0px 5px rgba(32, 32, 32, 0.1);
					}
				}

				.extra-info {
					display: flex;
					margin-top: 10px;
					align-items: center;

					.extra-icon {
						font-family: "iconfont";
						font-size: 13px;
						z-index: 2;
						width: 0;
						transform: translate(12px, 0);
						color: #6c6c6c;
					}

					input {
						box-shadow: 0 2px 5px rgba(32, 32, 32, 0.02);
						width: 100%;
						border: none;
						-webkit-appearance: none;
						border-radius: 20px;
						outline: none;
						font-size: 13px;
						color: #6c6c6c;
						padding: 6px 15px 6px 32px;
						background-color: white;
						transition: all 0.5s;

						&:focus,
						&:hover {
							box-shadow: 0 3px 5px rgba(32, 32, 32, 0.1);
						}
					}

					.extra-icon-mail {
						transform: translate(32px, 0);
					}

					.extra-mail {
						margin: 0 20px;
					}
				}

				&:hover {
					.send-button {
						margin-top: -118px;
						transform: scale(1);
						right: 10px;
						opacity: 1;
						border: 7px solid #f3f5f8;
					}
				}
			}

			.view-item {
				background: white;
				padding: 20px;
				font-size: 14px;
				border-radius: 20px;
				box-shadow: 0 2px 5px rgba(32, 32, 32, 0.02);
				font-weight: 200;
				margin: 20px 0;
				transition: all 0.3s;

				&:hover {
					box-shadow: 0 3px 5px rgba(32, 32, 32, 0.07);
				}

				.item-info {
					display: flex;
					flex-direction: row;

					.info-author {
						display: flex;
						flex-direction: row;
						align-items: center;

						.author-avatar {
							margin-right: 10px;

							img {
								width: 40px;
								height: 40px;
								border-radius: 100%;
								box-shadow: 0 3px 6px rgba(32, 32, 32, 0.1);
							}
						}

						.author-metas {
							font-weight: 400;

							.comment-time {
								margin-top: 2px;
								font-size: 13px;
								color: #a5a5a5;
							}
						}
					}
				}
			}
		}
	}
}
.cool-lightbox__slide {
	opacity: 1 !important;
}
@media (max-width: 991px) {
	.modal {
		.modal-close {
			display: block;
		}
		.bean-read {
			width: 100%;
			margin: 0;
			border-radius: 0;
			height: 100%;
			background-color: #e9e8e8;

			.article-cover {
				height: 72vw;

				.article-title {
					padding: 15px 20px 35px;
					font-size: 20px;
				}

				.article-category {
					padding: 15px 20px;
				}
			}

			.article-banner {
				padding: 8px 15px 8px 8px;
			}

			.article-content {
				padding: 10px 20px 20px;
				font-size: 0.9em;
				pre {
					margin-left: -20px;
					max-width: unset;
					width: calc(100% + 40px);
					font-size: 14px;
					border-radius: 0;
					code {
						border-radius: 0;
					}
				}
				.kg-width-full {
					margin-left: -20px;
					max-width: unset;
					width: calc(100% + 40px);
				}
				figure {
					margin: 0;
				}
			}

			.article-comment {
				padding: 0 20px 20px;
				margin-bottom: var(--safariBottomMargin);

				.view-item {
					font-size: 0.8em;
				}

				.extra-icon-mail {
					transform: translate(22px, 0) !important;
				}

				.extra-mail {
					margin: 0 10px !important;
				}
				.extra-info input {
					min-width: 0;
				}
				.OwO-logo {
					width: 100%;
				}
				.OwO-body {
					margin-left: 0;
					margin-top: 9px;
					border-top-right-radius: 0;
					width: 100% !important;
				}
				.OwO-items {
					text-align: center !important;
				}
			}
		}
	}
}
@media (max-width: 479px) {
	.modal .bean-read .article-comment .gt-comment-admin .gt-comment-avatar:after {
		margin: 15px 0 0 -15px;
		transform: scale(0.7);
	}
}
.no-backdrop-blur-read {
	backdrop-filter: none !important;
	background-color: rgba(255, 255, 255, 0.95) !important;
}
</style>
