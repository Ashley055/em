// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import App from './App'
import router from './router'

// import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
import F7Css from 'framework7/dist/css/my-app.css'
import 'framework7-icons/css/framework7-icons.css'
import '@/common/stylus/base.styl'
import F7 from 'framework7/dist/js/framework7.min.js'


Vue.config.productionTip = false
 
window.f7App = new window.Framework7(
	{
	    precompileTemplates: true,
	    template7Pages: true, //pages启用Template7
	    template7Data: {
	    },
	    modalTitle: '提示',
	    modalButtonOk: '确定',
	    modalButtonCancel: '取消'
	}
);
// If we need to use custom DOM library, let's save it to $$ variable:
window.$$ = Dom7;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
});
