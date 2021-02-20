<template>
	<div class="notify-container">
		<div class="notify" v-for="notification in notifications" v-bind:style="notification.style">
			<div class="title">{{ notification.title }}</div>
			<div class="content">{{ notification.content }}</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Notify",
	props: ["notifications"],
	created: function() {
		this.notifications = [];
	},
};
</script>
<style lang="less">
.notify-container {
	position: fixed;
	display: flex;
	top: 0;
	left: 0;
	align-items: flex-start;
	flex-direction: column-reverse;
	width: 100vw;
	z-index: 11;
	pointer-events: none;
	transition: all 0.5s;
	height: 100vh;
	.notify {
		background-color: rgba(15, 15, 15, 0.6);
		margin-left: 15px;
		pointer-events: all;
		transition: all 0.5s;
		box-sizing: border-box;
		border-radius: 100px;
		color: white;
		box-shadow: -5px -5px 10px rgba(32, 32, 32, 0.1), 5px 5px 10px rgba(32, 32, 32, 0.1);
		height: 60px;
		padding: 10px 25px;
		.title {
			font-size: 15px;
		}
		.content {
			margin: 2px 0;
			color: #eee;
			font-size: 13px;
		}
	}
}
@media (min-width: 991px) {
	.notify {
		animation: notify-show-hide-bottom 5s ease-in-out forwards;
		margin-bottom: 15px;
	}
}
@media (max-width: 991px) {
	.notify-container {
		flex-direction: column !important;
		.notify {
			animation: notify-show-hide-top 5s ease-in-out forwards;
			margin-top: 15px;
		}
	}
}
@keyframes notify-show-hide-bottom {
	0% {
		opacity: 0;
		transform: translate(-100%, 0);
		margin-bottom: 15px;
	}
	15% {
		opacity: 1;
		transform: translate(0, 0);
		margin-bottom: 15px;
	}
	85% {
		opacity: 1;
		transform: translate(0, 0);
		margin-bottom: 15px;
	}
	100% {
		opacity: 0;
		margin-bottom: -60px;
		display: none;
	}
}
@keyframes notify-show-hide-top {
	0% {
		opacity: 0;
		transform: translate(-100%, 0);
		margin-top: 15px;
	}
	15% {
		opacity: 1;
		transform: translate(0, 0);
		margin-top: 15px;
	}
	85% {
		opacity: 1;
		transform: translate(0, 0);
		margin-top: 15px;
	}
	100% {
		opacity: 0;
		margin-top: -60px;
		display: none;
	}
}
</style>
