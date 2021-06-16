import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { rutas } from './routes.js'
import Echo from 'laravel-echo'
import io from 'socket.io-client'

window.io = io

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host:'https://crm.derkayvargas.com:6001'
    // host:'http://dyvsa.test:6001'
    // host: window.location.hostname + ':6001',
});

window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: rutas,
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
	    return { x: 0, y: 0 };
	}
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
