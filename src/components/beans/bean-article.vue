<template>
	<router-link :to="{ name: 'read', params: { slug: article.slug } }" class="bean bean-article" :style="'background-image: url(\'' + article.feature_image + '\');'">
		<div class="article-category">
			<div class="category-item">
				<div class="item-text"> {{ article.postTime }}</div>
			</div>
			<div v-for="tag in article.tags" :key="tag.icon" class="category-item">
				<div class="item-text">{{ tag.name }}</div>
			</div>
		</div>
		<div class="article-title">
			<span>{{ article.title }}</span>
			<div class="article-summary">
				{{ article.excerpt }}
			</div>
		</div>
	</router-link>
</template>
<script>
export default {
	props: ["article"],
};
</script>

<style lang="less">
.bean-article {
	height: 400px;
	backdrop-filter: none;
	width: 500px;
	margin-left: 50px;
	user-select: none;
	will-change: transform;
	-moz-user-select: none;
	-webkit-user-select: none;
	transition: all 0.3s;
	cursor: pointer;
	background-position: center;
	display: flex;
	background-size: cover;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;

	.article-title {
		color: #f0f0f0;
		padding: 15px 20px;
		text-shadow: 0 0 5px rgba(35, 35, 35, 0.5), 0 0 5px rgba(35, 35, 35, 0.5);
		font-size: 26px;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-bottom: -34px;
		transition: all 0.3s;
		white-space: nowrap;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9));
		.article-summary {
			text-overflow: ellipsis;
			overflow: hidden;
			transition: all 0.3s;
			margin-top: 17px;
			color: #cecece;
			white-space: nowrap;
			font-size: 14px;
		}
	}

	.article-category {
		display: flex;
		align-items: center;
		padding: 15px 20px;
		flex-direction: row-reverse;

		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;

		.category-item {
			display: flex;
			align-items: center;
			color: initial;
			background-color: rgba(255, 255, 255, 0.8);
			padding: 2px 5px;
			height: 19px;
			border-radius: 5px;
			margin-left: 8px;
			backdrop-filter: blur(5px);
			box-shadow: 0 0 10px rgba(32, 32, 32, 0.2);

			.item-date {
				margin-right: 4px;
				font-size: 13px;
			}

			.item-text {
				font-size: 13px;
				font-family: "iconfont";
				//font-weight: bold;
				margin-top: -2px;
			}
		}
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

.bean-article-textonly {
	color: #000000;
	backdrop-filter: blur(20px);
	justify-content: flex-start;

	.article-title {
		background: none;
		flex-shrink: 0;
		color: #111111;
		padding: 15px 20px 0;
		text-shadow: none;
	}

	.article-content {
		max-height: calc(100% - 80px);
		padding: 0 30px;
		overflow: hidden;
	}

	.article-category {
		position: absolute;
		bottom: 0;
		width: 100%;

		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		box-sizing: border-box;

		.category-item {
			background-color: rgba(255, 255, 255, 0.4);
		}
	}

	&:hover {
		background-color: rgba(223, 242, 255, 0.5);
	}
}
</style>
