import UserService from '../../services/user'

const namespaced = true

const state = {
  email: ''
}

const getters = {
  getUserInfo: state => state
}

const actions = {
  async login ({ commit }, user) {
    try {
      const result = await UserService.login(user.email, user.password)
      commit('setUserInfo', result)
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  async logout ({ commit }) {
    await UserService.logout()
    commit('clearUserInfo')
    commit('link/clearAllData', undefined, { root: true })
  },
  async register ({ commit }, user) {
    try {
      await UserService.register(user.email, user.password)
      commit('message/setMessage', {code: '200', message: 'User created!'}, { root: true })
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  }
}

const mutations = {
  setUserInfo (state, user) {
    state.email = user.email
  },
  clearUserInfo (state) {
    state = ''
  }
}

export default {
  state,
  namespaced,
  getters,
  actions,
  mutations
}
