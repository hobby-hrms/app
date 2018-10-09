// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Croppa from 'vue-croppa'
import router from './router'
import { store } from './store/index'
import './assets/global.css'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VForm,
  VTextField,
  VAvatar,
  VDivider,
  VCard,
  VDataTable,
  VAlert,
  VSelect,
  VMenu,
  VDatePicker,
  VTimePicker,
  VRadioGroup,
  VDialog,
  VSnackbar,
  VStepper,
  VSlider,
  VProgressCircular,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Croppa)

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VForm,
    VTextField,
    VAvatar,
    VDivider,
    VCard,
    VDataTable,
    VAlert,
    VSelect,
    VMenu,
    VDatePicker,
    VTimePicker,
    VRadioGroup,
    VDialog,
    VSnackbar,
    VStepper,
    VSlider,
    VProgressCircular,
    transitions
  }
})

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   store.dispatch('checkConnectionToServer').then(() => {
//     const status = store.getters.getConnectionStatus
//     if (status === 'NETWORK_ERROR') {
//       next({ name: 'Error', replace: true })
//     } else {
//       next()
//     }
//   })
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
