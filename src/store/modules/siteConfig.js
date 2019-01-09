const namespaced = true

const state = {
  isLoading: false,
  listPageView: 'grid'
}

const getters = {
  getLoadingState: state => state.isLoading,
  getListPageView: state => state.listPageView
}

const actions = {
  loadingAction ({ commit }) {
    commit('changeLoadingState', true)
  },
  loadedAction ({ commit }) {
    commit('changeLoadingState', false)
  },
  toggleListPageView ({ commit }, value) {
    commit('toggleListPageView', value)
  }
}

const mutations = {
  changeLoadingState (state, isloading) {
    state.isLoading = isloading
  },
  toggleListPageView (state, value) {
    state.listPageView = value
  }
}
export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
