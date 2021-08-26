import { login, info, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken(),
  info: {},
  enums: {},
  invoice: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, data) => {
    state.info = data
  },
  SET_ENUMS: (state, data) => {
    state.enums = data
  },
  SET_INVOICE: (state, data) => {
    state.invoice = data
  }
}

const actions = {
  login ({ commit }, info) {
    return new Promise((resolve, reject) => {
      login(info).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  register ({ commit }, info) {
    return new Promise((resolve, reject) => {
      register(info).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      info().then(response => {
        commit('SET_INFO', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
