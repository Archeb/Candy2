<template>
	<div class="contained-beans">
		<template v-for="item in categoryData">
			<BeanBlock v-if="item.type == 'blocks' && !item.hidden" :key="item.id" :blocks="item" :class="{ 'bean-in-animation': item.dynamicAdded }" :style="{ 'animation-delay': item.dynamicAnimationDelay + 'ms' }" />
			<BeanArticle v-if="item.type == 'article' && !item.hidden" :key="item.id" :article="item" :class="{ 'bean-in-animation': item.dynamicAdded }" :style="{ 'animation-delay': item.dynamicAnimationDelay + 'ms' }" />
		</template>
		<div class="bean-space"></div>
	</div>
</template>
<script>
import BeanBlock from "./bean-block.vue";
import BeanArticle from "./bean-article.vue";
export default {
	components: {
		BeanBlock,
		BeanArticle,
	},
	props: ["categoryData"],
};
</script>
<style>
.bean-in-animation {
	opacity: 0;
	animation: right-in 0.5s forwards;
	animation-timing-function: cubic-bezier(0, 0, 0.4, 1);
}
@media (max-width: 991px) {
	.bean-in-animation {
		opacity: 0;
		animation-name: bottom-in;
	}
}
@keyframes right-in {
	from {
		opacity: 0;
		transform: translate(50vw);
	}
	to {
		transform: translate(0);
		opacity: 1;
	}
}
@keyframes bottom-in {
	from {
		opacity: 0;
		transform: translate(0, 50vh);
	}
	to {
		transform: translate(0);
		opacity: 1;
	}
}
</style>
