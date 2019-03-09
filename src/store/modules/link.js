import _ from 'lodash'
import LinkService from '../../services/link'

const state = {
  filteredLinks: [],
  links: [],
  link: {},
  numberOfLinks: 0,
  numberOfSharedLinks: 0,
  message: ''
}

const namespaced = true

const actions = {
  async getAllLinks ({ commit }) {
    try {
      const result = await LinkService.getAllLinks()
      commit('setLinks', result.sort((a, b) => b.updateAt - a.updateAt))
      commit('getNumberOfLinks')
      commit('getNumberOfSharedLinks')
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  async deleteLink ({ commit }, payload) {
    try {
      await LinkService.deleteLink(payload.id)
      commit('deleteLink', payload.id)
      commit('message/setMessage', {code: '200', message: 'Link deleted!'}, { root: true })
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  async getLink ({ commit }, payload) {
    try {
      const result = await LinkService.getLink(payload)
      if (result.exists()) {
        commit('getLink', result.val())
      } else {
        commit('message/setMessage', {code: '404', message: 'Link not found!'}, { root: true })
      }
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  async updateLink ({ commit }, data) {
    try {
      const result = await LinkService.updateLink(data)
      commit('updateLink', result)
      commit('message/setMessage', {code: '200', message: 'Link updated!'}, { root: true })
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  async toggleShareLink ({commit}, payload) {
    try {
      const result = await LinkService.toggleShareLink(payload)
      commit('updateLink', result)
      commit('getNumberOfLinks')
      commit('getNumberOfSharedLinks')
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  async addLink ({ commit }, data) {
    try {
      const result = await LinkService.addlink(data)
      commit('addLink', result)
      commit('message/setMessage', {code: '200', message: 'Link created!'}, { root: true })
    } catch (e) {
      commit('message/setMessage', e, { root: true })
    }
  },
  searchLinkByTag ({ commit }, keyword) {
    commit('searchLinkByTag', keyword)
  }
}

// mutations
const mutations = {
  setLinks (state, links) {
    state.links = links
    state.filteredLinks = links
  },
  getNumberOfSharedLinks (state) {
    state.numberOfSharedLinks = _.chain(state).get('links').filter(link => link.isShared).size().value()
  },
  getNumberOfLinks (state) {
    state.numberOfLinks = _.chain(state).get('links').size().value()
  },
  deleteLink (state, id) {
    const links = _.chain(state).get('links')
    state.links = links.filter(link => link.id !== id).value()
    state.filteredLinks = links.value()
    state.numberOfLinks = links.size().value()
    state.numberOfSharedLinks = links.filter(link => link.isShared).size().value()
  },
  getLink (state, link) {
    state.link = link
  },
  updateLink (state, link) {
    state.links.map(item => {
      if (item.id === link.id) {
        state.link = link
      }
      state.link = item
    })
  },
  addLink (state, link) {
    state.links = [
      ...state.links,
      link
    ]
  },
  searchLinkByTag (state, keyword) {
    state.filteredLinks = state.links.filter(link =>
      (link.tags) ? link.tags
        .map(tag => tag.tag)
        .join('')
        .toLowerCase()
        .includes(keyword.toLowerCase()) : link
    )
  },
  clearAllData (state) {
    state.links = {
      filteredLinks: [],
      links: [],
      link: {},
      numberOfLinks: 0,
      numberOfSharedLinks: 0,
      message: ''
    }
  }
}

// getters
const getters = {
  getAllLinks: state => state.filteredLinks,
  getNumberOfSharedLinks: state => state.numberOfSharedLinks,
  getNumberOfLinks: state => state.numberOfLinks,
  getLink: state => state.link
}

export default {
  state,
  namespaced,
  getters,
  actions,
  mutations
}
