import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import {
//   library
// } from '@fortawesome/fontawesome-svg-core'
// import {
//   faUserSecret,
//   fasFaAd
// }
// from '@fortawesome/free-solid-svg-icons'

// import {
//   FontAwesomeIcon
// } from '@fortawesome/vue-fontawesome'

// library.add(faUserSecret);
// library.add(fasFaAd);
// Vue.component('font-awesome-icon', FontAwesomeIcon);

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.use(Notifications);

Vue.prototype.$notification = (data, option = {}) => {
  if (data == '' || data.trim().length == 0) {
    Vue.notify({
      group: 'alert',
      type: option.type || 'error',
      title: option.title || ' ',
      text: option.text || 'some thing wrong',
    })
    return false
  } else {
    return true
  }
}

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
