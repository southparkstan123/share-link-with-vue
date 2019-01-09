<template>
  <div id="app">
    <div v-if="isLogin">
      <nav-bar></nav-bar>
    </div>
    <div class="container-fluid">
      <alert></alert>
      <div class="col-md-12">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import Alert from './components/Alert'
import { mapGetters } from 'vuex'
import UserService from './services/user'

export default {
  name: 'App',
  components: {
    'alert': Alert,
    'nav-bar': NavBar
  },
  computed: {
    ...mapGetters({
      user: 'user/getUserInfo',
      isLoading: ''
    })
  },
  methods: {
    checkAuth () {
      UserService.isAuth(userInfo => {
        if (userInfo) {
          this.$store.commit('user/setUserInfo', userInfo)
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      })
    }
  },
  data () {
    return {
      isLogin: false
    }
  },
  beforeMount () {
    this.checkAuth()
    setTimeout(() => {
      this.$store.commit('message/closeMessage')
    }, 1000)
  },
  beforeUpdate () {
    this.checkAuth()
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.input-wrapper{
    margin-bottom: 10px;
}
.container-fluid{
  padding-top: 15px;
}
</style>
