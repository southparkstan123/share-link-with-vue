import UserService from '../../services/user'

const namespaced = true

const state = {
  email: ''
}

const getters = {
  getUserInfo: state => state
}

const actions = {
  login ({ commit }, user) {
    UserService.login(user.email, user.password).then(
      (firebaseUser) => {
        commit('setUserInfo', firebaseUser)
      }
    ).catch(e => commit('message/setMessage', e, { root: true }))
  },
  logout ({ commit }) {
    UserService.logout().then(() => {
      commit('clearUserInfo')
      commit('link/clearAllData', undefined, { root: true })
    })
  },
  register ({ commit }, user) {
    UserService.register(user.email, user.password).then(
      () => {
        commit('message/setMessage', {code: '200', message: 'User created!'}, { root: true })
      }
    ).catch(e => {
      alert(e.message)
      commit('message/setMessage', e, { root: true })
    })
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
