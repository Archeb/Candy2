var waitforscroll;
var j = 0;
var wheelNode;

function horizontalWheel(eve) {
	if (window.animationRunning == true) {
		return;
	}
	if (eve.deltaX != 0) {
		// 支持横滚的鼠标或触控板，不需要支持，卸载插件
		wheelNode.removeEventListener("wheel", horizontalWheel);
		return;
	}
	var myDelta;
	eve.deltaY > 0 ? (myDelta = 100) : (myDelta = -100);
	waitforscroll += myDelta;
}

function horwheel(node) {
	if (node === undefined) {
		return false;
	}
	wheelNode = node;
	node.addEventListener("wheel", horizontalWheel, false);
	waitforscroll = 0;
	setInterval(execScroll, 5, node);

	return node;
}

function execScroll(node) {
	if (window.animationRunning == true) {
		return;
	}
	if (waitforscroll > 1200) {
		node.scrollLeft += 20;
		waitforscroll -= 20;
	} else if (waitforscroll <= 1200 && waitforscroll > 800) {
		node.scrollLeft += 15;
		waitforscroll -= 15;
	} else if (waitforscroll <= 800 && waitforscroll > 300) {
		node.scrollLeft += 9.4;
		waitforscroll -= 9.4;
	} else if (waitforscroll > 1 && waitforscroll <= 300) {
		j = waitforscroll ** 0.4;
		if (j) {
			node.scrollLeft += j;
			waitforscroll -= j;
		}
	} else if (waitforscroll > -1 && waitforscroll < 1) {
		waitforscroll = 0;
		node.scrollLeft += waitforscroll;
	} else if (waitforscroll < -1200) {
		node.scrollLeft -= 20;
		waitforscroll += 20;
	} else if (waitforscroll >= -1200 && waitforscroll < -800) {
		node.scrollLeft -= 15;
		waitforscroll += 15;
	} else if (waitforscroll >= -800 && waitforscroll < -300) {
		node.scrollLeft -= 9.4;
		waitforscroll += 9.4;
	} else if (waitforscroll < -1 && waitforscroll >= -300) {
		j = (-waitforscroll) ** 0.4;
		if (j) {
			node.scrollLeft -= j;
			waitforscroll += j;
		}
	}
}

function backgroundCover(elementSizes, containerSizes) {
	const elementRatio = elementSizes.width / elementSizes.height;
	const containerRatio = containerSizes.width / containerSizes.height;

	let width, height;

	if (containerRatio > elementRatio) {
		width = containerSizes.width;
		height = containerSizes.width / elementRatio;
	} else {
		width = containerSizes.height * elementRatio;
		height = containerSizes.height;
	}

	return {
		width,
		height,
	};
}

export default horwheel;
