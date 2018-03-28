// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {path: '/', redirect: '/goods'},
  { path: '/goods', component: goods },
  { path: '/seller', component: seller },
  { path: '/ratings', component: ratings }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  // el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app');

// router.go('/goods'); 页面会一直刷新
