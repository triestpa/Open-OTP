import Vue from 'vue'
import App from './app.vue'

import * as mui from 'muicss/dist/js/mui.js'
window.mui = mui

new Vue({
  el: '#app',
  render: h => h(App)
})