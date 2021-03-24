import TimeAgo from "javascript-time-ago";
import zh from "javascript-time-ago/locale/zh";

TimeAgo.locale(zh);
const timeAgo = new TimeAgo("zh");
/*
renderer.code = (code, language) => {
	const validLang = !!(language && highlightjs.getLanguage(language));
	const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
	return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};
*/
window.objectCache = {};
const apiUrl = "https://blogapi.qwq.moe:24022/ghost/api/v3/";
const apiKey = "63f48af3de52e44a14e417ed44";
const replace_pair = [{ from: "https://blogapi.qwq.moe:24022/content/images", to: "https://azure.globalslb.net/qwq/content/images" }];

export default {
	install: function(Vue, opitions) {
		let articleProcess = function(posts, type = "posts") {
			posts.forEach((item, index) => {
				if (item.tags.some((el) => el.slug == "block")) {
					item.type = "blocks";
				} else {
					item.type = "article";
				}
				for (var pair of replace_pair) {
					item.html = item.html.replace(new RegExp(pair.from, "gm"), pair.to);
					if (item.feature_image) item.feature_image = item.feature_image.replace(new RegExp(pair.from, "gm"), pair.to);
				}
				item.postTime = timeAgo.format(new Date(item.published_at));
				let dateObj = new Date(item.published_at);
				item.published_at = dateObj.getFullYear() + "年" + (dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日";
				window.objectCache[item.slug] = item;
			});
			return posts;
		};
		Vue.prototype.getCategoryData = (path) => {
			return new Promise((resolve, reject) => {
				//先匹配页码
				let page = 1;
				let regexPage, regexResult;
				if ((regexPage = path.match(/\/page\/(\d+)/))) {
					page = regexPage[1];
				}
				if (path.match(/^\/$|^\/page\//)) {
					fetch(apiUrl + "content/posts/?include=tags,authors&page=" + page + "&key=" + apiKey)
						.then((r) => r.json())
						.then((r) => {
							r.posts = articleProcess(r.posts);
							resolve(r.posts);
						});
				} else if ((regexResult = path.match(/\/(tag|author)\/(.+?)\//))) {
					fetch(apiUrl + "content/posts/?include=tags,authors&page=" + page + "&filter=" + regexResult[1] + ":" + regexResult[2] + "&key=" + apiKey)
						.then((r) => r.json())
						.then((r) => {
							r.posts = articleProcess(r.posts);
							resolve(r.posts);
						});
				} else {
					if (window.objectCache[path.split("/")[1]] !== undefined) {
						resolve(window.objectCache[path.split("/")[1]]);
					} else {
						//因为不知道这是文章还是页面，所以只能同时查询
						let urls = [apiUrl + "content/posts/slug" + path + "/?include=tags,authors&key=" + apiKey, apiUrl + "content/pages/slug" + path + "/?include=tags,authors&key=" + apiKey];
						let requests = urls.map((url) => fetch(url));
						Promise.all(requests).then((r) => {
							let failedCount = 0;
							r.forEach((res) => {
								if (res.status == 200) {
									res.json().then((result) => {
										if (typeof result.posts == "undefined") result.posts = result.pages;
										result.posts = articleProcess(result.posts);
										resolve(result.posts[0]);
									});
								} else {
									failedCount++;
								}
							});
							if (failedCount >= 2) {
								window.location = "/";
							}
						});
					}
				}
			});
		};
	},
};
