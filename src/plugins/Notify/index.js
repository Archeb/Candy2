import Notify from "./Notify.vue";

const install = (Vue) => {
  var Component = Vue.extend(Notify);
  var cm = new Component().$mount();
  document.body.appendChild(cm.$el);
  Vue.prototype.$Notify = function (title, content, style) {
    cm.notifications.push({ title: title, content: content, style: style });
  };
};

export default install;