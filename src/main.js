import Vue from 'vue'
import App from './app.vue'

// Add MUI js lib to window scope
import * as mui from 'muicss/dist/js/mui.js'
window.mui = mui

// Initialize Vue app
new Vue({
  el: '#app',
  render: h => h(App)
})