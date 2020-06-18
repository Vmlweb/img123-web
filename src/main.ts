import 'reflect-metadata'
import 'whatwg-fetch'
import VueGtag from 'vue-gtag'

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: {
    params: {
      send_page_view: false // eslint-disable-line
    },
    id: 'UA-54537503-11'
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
