<template>
	<div class="block-container" v-append="blocks.html">
		<!--<a v-for="block in blocks" :key="block.title" class="bean bean-block" :class="block.style" :style="block.image ? 'background-image: url(' + block.image + ')' : ''" :href="block.url ? block.url : false" target="_blank">
			<div class="block-group">
				<div class="block-title">{{ block.title }}</div>
				<div class="block-description">{{ block.description }}</div>
			</div>
			<div class="block-metainfo" v-if="block.type == 'github'">
				<div class="type"><span class="icon"></span><span class="name"> 项目</span></div>
				<div class="stars">
					<svg aria-label="stars" class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
						<path
							fill-rule="evenodd"
							d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
						></path>
					</svg>
					{{ block.stars }}
				</div>
				<div class="fork">
					<svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
						<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
					</svg>
					{{ block.forks }}
				</div>
			</div>
			<div class="block-metainfo" v-if="block.type == 'tweet'">
				<div class="type"><span class="icon"></span><span class="name"> 吐槽</span></div>
				<div class="stars"><span class="icon"></span> {{ block.likes }}</div>
			</div>
			<div class="block-mask" v-if="block.type == 'bangumi'"></div>
			<div class="block-metainfo" v-if="block.type == 'bangumi'">
				<div class="type"><span class="icon"></span><span class="name"> 追番</span></div>
				<div class="stars"><span class="icon"></span> 233</div>
			</div>
		</a>-->
	</div>
</template>

<script>
export default {
	props: ["blocks"],
};
</script>

<style lang="less">
.block-container {
	display: flex;
	margin-left: 50px;
	flex-wrap: wrap;
	flex-direction: column;
	height: 420px;
	column-gap: 20px;

	.bean-block {
		width: 240px;
		height: 190px;
		margin: 10px 0;
		box-sizing: border-box;
		display: flex;
		transition: all 0.3s;
		flex-direction: column;
		background-size: cover;
		opacity: 0.97;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		padding: 20px;
		overflow: hidden;

		.block-title {
			font-size: 24px;
			display: inline-block;
			color: #333333;
			place-self: baseline;
			border-bottom: 1px dashed #999;
			padding-bottom: 2px;
		}

		.block-description {
			margin-top: 7px;
			font-size: 15px;
		}

		.block-metainfo {
			margin-top: auto;

			font-size: 14px;
			display: flex;

			.type {
				margin-right: auto;
			}

			.icon {
				margin-right: 5px;
				font-family: "iconfont";
			}

			.block-metainfo {
				font-size: 14px;
				display: flex;
				align-items: center;
			}

			& > div {
				display: flex;
				align-items: center;
			}

			.stars {
				margin-right: 10px;
			}

			svg {
				fill: #555555;
				margin-right: 5px;
			}
		}

		& > div {
			color: #555555;
			text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
		}
		&:hover {
			background-color: rgba(254, 254, 254, 0.3);
			//transform: translate(0, -2px);

			box-shadow: -5px -5px 10px rgba(32, 32, 32, 0.2), 5px 5px 10px rgba(32, 32, 32, 0.2);
			.article-title {
				margin-bottom: 0;
				.article-summary {
					margin-top: 5px;
				}
			}
		}

		&:active {
			transform: scale(0.99);
		}
	}

	.bean-block-dark {
		.block-title {
			color: #f3e7e9;
		}

		div {
			color: #b7c8cc;
		}

		.block-metainfo svg {
			fill: #b7c8cc;
		}
	}

	.bean-block-bangumi {
		.block-mask {
			position: fixed;
			backdrop-filter: blur(5px);
			width: calc(100% + 2px);
			height: calc(100% + 2px);
			margin-top: -21px;
			margin-left: -21px;
			border-radius: 20px;
			background: rgba(0, 0, 0, 0.65);
			pointer-events: none;
			z-index: -1;
		}
		.block-title {
			font-size: 20px;
		}
		transition: all 0.3s;

		& > * {
			transition: all 0.3s;
		}

		&:hover {
			& > * {
				opacity: 0;
			}
		}
	}
	.bean-block-dark-bg {
		background-image: linear-gradient(45deg, #29323c 0%, #485563 100%);
	}
	.bean-block-light-bg-1 {
		background-image: linear-gradient(45deg, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);
	}
	.bean-block-light-bg-2 {
		background-image: linear-gradient(45deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
	}
}
@media (max-width: 991px) {
	.block-container {
		margin-top: 20px;
		visibility: visible;
		opacity: 1;
		width: 90vw !important;
		margin-left: 0;
		column-gap: 0;
		margin-right: 0;
		flex-direction: row;
		margin-bottom: -20px;

		.bean-block {
			width: 100%;
			margin: 0 0 20px;
			height: 100px;
			padding: 20px;
			justify-content: center;
			flex-direction: row-reverse;
			&:nth-child(2n-1) {
				margin-right: 20px;
			}
			.block-group {
				margin-left: 15px;
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
			}
			.block-metainfo {
				margin-right: auto;
				height: 100%;
				margin-top: 0;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.stars {
					margin-top: auto;
				}
				.type {
					.name {
						display: none;
					}
					.icon {
						font-size: 30px;
						margin-right: 0;
					}
				}
				.fork {
					display: none;
				}
				& > div {
					margin-right: 0 !important;
				}
			}
			.block-title {
				font-size: 20px;
				float: left;
			}
			.block-description {
				font-size: 15px;
				margin-top: auto;
				width: 65vw;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.block-mask {
				margin-left: 0px;
				width: 90vw;
				height: 101px;
			}
		}
	}
}
</style>
