<template>
    <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#" @click="routeToMainPage()">ShareLink</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>View Profile</em>
        </template>
        <b-dropdown-header>{{ user.email }}</b-dropdown-header>
        <b-dropdown-item disabled>{{ numOfLinks | linkLabel }}</b-dropdown-item>
        <b-dropdown-item disabled>{{ numOfSharedLinks | shareLinkLabel }}</b-dropdown-item>
        <b-dropdown-item @click="onLogout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  beforeMount () {
    this.$store.dispatch('siteConfig/loadingAction', true)
    this.$store.dispatch('link/getAllLinks')
    setTimeout(() => {
      this.$store.dispatch('siteConfig/loadedAction', false)
    }, 1000)
  },
  data () {
    return {
      value: 100
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUserInfo',
      numOfLinks: 'link/getNumberOfLinks',
      numOfSharedLinks: 'link/getNumberOfSharedLinks',
      isLoading: 'siteConfig/getLoadingState'
    })
  },
  filters: {
    linkLabel (numOfLinks) {
      return (numOfLinks > 1) ? numOfLinks + ' Links' : (numOfLinks !== 0) ? numOfLinks + ' Link' : 'No Link'
    },
    shareLinkLabel (numOfLinks) {
      return (numOfLinks > 1) ? numOfLinks + ' Shared Links' : (numOfLinks !== 0) ? numOfLinks + ' Shared Link' : 'No Shared Link'
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    },
    routeToMainPage () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
