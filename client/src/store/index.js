import Vue from 'vue'
import Vuex from 'vuex'

// Import modules here
import auth from './modules/auth'
import file from './modules/file'
import { server } from './helpers/axios.helper'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    connectionStatus: null
  },
  getters: {
    getConnectionStatus: state => {
      return state.connectionStatus
    }
  },
  mutations: {
    setConnectionStatus: (state, payload) => {
      state.connectionStatus = payload.connectionStatus
    }
  },
  actions: {
    checkConnectionToServer: context => {
      return server
        .get('/connection/testing')
        .then(resolve => {
          context.commit('setConnectionStatus', { connectionStatus: 'ONLINE' })
        })
        .catch(err => {
          if (err.message) {
            context.commit('setConnectionStatus', { connectionStatus: 'NETWORK_ERROR' })
          }
        })
    }
  },
  modules: {
    auth,
    file
  }
})
