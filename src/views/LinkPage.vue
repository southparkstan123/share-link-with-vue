<template>
    <loading v-if="isLoading"></loading>
    <div v-else>
      <search-bar></search-bar>
      <div class="control-panel clearfix">
        <div class="float-left clearfix">
        </div>
        <div class="float-right clearfix">
          <b-btn variant="outline-primary" @click="showModal">Infomation</b-btn>
          <b-btn variant="outline-info" @click="routeToAddLink">
            <font-awesome-icon icon="plus"></font-awesome-icon>
          </b-btn>
          <b-btn variant="outline-warning" @click="routeToChangeView">
            <font-awesome-icon :icon="view | isTableView"></font-awesome-icon>
          </b-btn>
        </div>
      </div>
      <div v-if="links.length === 0">
        <h1 class="text-center">No Links</h1>
      </div>
      <div class="list" v-else>
        <link-transition mode="out-in">
          <link-list-table v-if="view === 'table'" v-bind:links="links"></link-list-table>
          <link-list-grid v-else v-bind:links="links"></link-list-grid>
        </link-transition>
      </div>
    </div>
</template>

<script>
/* @flow */
import SearchBar from '../components/SearchBar'
import LinkListGrid from '../components/LinkListGrid'
import LinkListTable from '../components/LinkListTable'
import LinkForm from '../components/LinkForm'
import Loading from '../components/Loading'
import queryString from 'query-string'
import LinkTransition from '../components/LinkTransition'

import bButton from 'bootstrap-vue/es/components/button/button'
import { mapGetters } from 'vuex'

export default {
  components: {
    'search-bar': SearchBar,
    'link-list-grid': LinkListGrid,
    'link-list-table': LinkListTable,
    'b-btn': bButton,
    'link-form': LinkForm,
    'loading': Loading,
    'link-transition': LinkTransition
  },
  computed: mapGetters({
    links: 'link/getAllLinks',
    isLoading: 'siteConfig/getLoadingState',
    view: 'siteConfig/getListPageView'
  }),
  filters: {
    isTableView (value) {
      return (value === 'table') ? 'th' : 'table'
    }
  },
  methods: {
    routeToChangeView () {
      const path = '/'
      const query = {'view': (this.view === 'table') ? 'grid' : 'table'}
      this.$store.dispatch('siteConfig/toggleListPageView', query.view)
      this.$router.replace({path, query})
    },
    routeToAddLink (id) {
      const path = '/add_link'
      this.$router.push({path})
    },
    loadListViewFromQueryString () {
      const query = queryString.parse(location.search)
      return query && query['view'] ? query['view'] + '' : ''
    },
    showModal () {
      this.$store.commit('modal/openModal', {title: 'This is title!', message: 'Modal is opened!'})
    }
  },
  beforeMount () {
    this.$store.dispatch('siteConfig/loadingAction', true)
    this.$store.dispatch('siteConfig/toggleListPageView', this.loadListViewFromQueryString())
    setTimeout(() => {
      this.$store.dispatch('siteConfig/loadedAction', false)
    }, 2000)
  },
  mounted () {
    this.$store.dispatch('link/getAllLinks')
  }
}
</script>

<style>
  .list{
    max-height: 500px;
    overflow-y: auto;
  }
  .input-wrapper{
    margin-top: 10px;
  }
  .control-panel{
    margin: 10px;
  }
</style>
