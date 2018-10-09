import { server } from '../helpers/axios.helper'

const state = {
  token: null,
  status: null,
  user: null
}

const getters = {
  getToken: state => {
    return state.token
  },
  getCurrentStatus: state => {
    return state.status
  },
  getUser: state => {
    return state.user
  }
}

const mutations = {
  setToken: (state, payload) => {
    state.token = payload
  },
  setStatus: (state, payload) => {
    state.status = payload
  },
  setUser: (state, payload) => {
    state.user = payload
  }
}

const actions = {
  async authenticateUser(context, payload) {
    try {
      const res = await server.post('/auth/login', {
        employeeId: payload.employeeId,
        password: payload.password,
        type: payload.type
      })
      const user = res.data.result
      if (user.payload.usage === 'LOGIN') {
        context.commit('setToken', user.token)
        context.commit('setStatus', 'VERIFIED')
        context.commit('setUser', {
          email: user.payload.email,
          name: user.payload.name,
          avatar: user.payload.avatar,
          nickname: user.payload.nickname,
          role: user.payload.role,
          position: user.payload.position,
          employeeId: user.payload.employeeId
        })
      } else if (user.payload.usage === 'NEW') {
        context.commit('setToken', user.token)
        context.commit('setStatus', 'NEW')
      }
      
      localStorage.setItem('token', user.token)
    } catch (err) {
      const res = err.response.data
      context.commit('setStatus', res.result)
    }
  },
  async validateUserToken(context, payload) {
    try {
      const res = await server.post('/auth/verify', {
        token: payload.token
      })
      const user = res.data.result
      if (user.usage === 'LOGIN') {
        context.commit('setToken', payload.token)
        context.commit('setStatus', 'VERIFIED')
        context.commit('setUser', {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          nickname: user.nickname,
          role: user.role,
          position: user.position,
          employeeId: user.employeeId
        })
      } else if (user.usage === 'PASSWORD_RESET') {
        context.commit('setToken', payload.token)
        context.commit('setStatus', 'PASSWORD_RESET')
        // context.commit('setUser', {
        //   email: user.email,
        //   name: user.name,
        //   avatar: user.avatar,
        //   nickname: user.nickname,
        //   role: user.role,
        //   position: user.position,
        //   employeeId: user.employeeId
        // })
      }
    } catch (err) {
      const res = err.response.data
      context.commit('setStatus', res.result)
    }
  },
  async updateUserPassword(context, payload) {
    try {
      const res = await server.post(
        '/api/password/update',
        {
          password: payload.password
        },
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      const result = res.data.result
      if (result === 'UPDATE_SUCCESS') {
        context.commit('setStatus', 'UPDATE_SUCCESS')
      }
    } catch (err) {
      const res = err.response.data
      context.commit('setStatus', res.result)
    }
  },
  // this function does not commit into auth status
  async getPasswordResetToken(context, payload) {
    try {
      const res = await server.post(
        '/api/password/verify',
        {
          password: payload.password
        },
        {
          headers: {
            Authorization: payload.token
          }
        }
      )
      const result = res.data.result
      return result
    } catch (err) {
      const res = err.response.data
      console.log(res)
      return res
    }
  },
  manuallySetStatus(context, payload) {
    context.commit('setStatus', payload)
  },
  logoutUser(context) {
    context.commit('setStatus', null)
    context.commit('setToken', null)
    context.commit('setUser', null)
    localStorage.removeItem('token')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
