<template>
  <b-card id="loginPanel" header="Welcome to ShareLink">
    <b-form-group id="fieldsetHorizontal" horizontal :label-cols="2" breakpoint="md" label="Email" label-for="inputHorizontal">
      <b-form-input v-model="email" type="email" placeholder="Enter your email"/>
    </b-form-group>
    <b-form-group id="fieldsetHorizontal" horizontal :label-cols="2" breakpoint="md" label="Password" label-for="inputHorizontal">
      <b-form-input v-model="password" type="password" placeholder="Enter your password"/>
    </b-form-group>
    <b-row class="my-2">
      <b-button type="submit" variant="success" class="mx-2" @click="onLogin">Login</b-button>
      <b-button type="button" variant="primary" @click="routeToRegisterPage">Register</b-button>
    </b-row>
  </b-card>
</template>

<script>
import bForm from 'bootstrap-vue/es/components/form/form'
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import UserService from '../services/user'

export default {
  components: {
    'b-form': bForm,
    'b-input-group': bInputGroup
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  beforeMount () {
    this.checkAuth()
  },
  methods: {
    checkAuth () {
      UserService.isAuth(userInfo => {
        if (userInfo) {
          this.$router.replace('/')
        }
      })
    },
    onLogin () {
      this.$store.dispatch('message/closeMessage')
      this.$store
        .dispatch('user/login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.replace('/')
        })
    },
    routeToRegisterPage () {
      this.$router.push('register')
    }
  }
}
</script>

<style scoped>
  #loginPanel {
    max-width: 500px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
