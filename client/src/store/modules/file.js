import { server, aws } from '../helpers/axios.helper'
import { reject } from 'when'

const state = {
  data: null,
  status: null
}

const getters = {
  getData: state => {
    return state.data
  },
  getStatus: state => {
    return state.status
  }
}

const mutations = {
  setData: (state, payload) => {
    state.data = payload
  }
}

const actions = {
  prepareImageUpload: (context, payload) => {
    context.commit('setData', payload)
  },
  getPresignedUrl: (context, payload) => {
    return server
      .get(`/api/upload?type=${payload.type}`, {
        headers: {
          Authorization: payload.token
        }
      })
      .then(
        resolve => {
          return resolve.data
        },
        reject => {
          return reject.response.data
        }
      )
  },
  uploadImage: (context, payload) => {
    return aws
      .put(payload.url, payload.data, {
        headers: {
          'Content-Type': payload.type
        }
      })
      .then(
        resolve => {
          return resolve.data
        },
        reject => {
          return reject.response.data
        }
      )
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
