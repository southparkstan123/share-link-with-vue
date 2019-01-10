<template>
  <div class="container">
    <b-form @submit="onRegister">
      <b-form-group id="fieldsetHorizontal" horizontal :label-cols="2" breakpoint="md" label="Email" label-for="inputHorizontal">
        <b-form-input v-model="form.email" type="email" placeholder="Enter your email" @input="$v.form.email.$touch()" :state="!$v.form.email.$error && null" aria-describedby="inputLiveHelp inputLiveFeedback"
        />
        <b-form-invalid-feedback id="inputLiveFeedback" v-if="!$v.form.email.required">
          Email is required.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback id="inputLiveFeedback" v-if="!$v.form.email.email">
          Invalid email format.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal" horizontal :label-cols="2" breakpoint="md" label="Password" label-for="inputHorizontal">
        <b-form-input v-model="form.password" type="password" placeholder="Enter your password" @input="$v.form.password.$touch()" :state="!$v.form.password.$error && null"
        />
        <b-form-invalid-feedback id="inputLiveFeedback" v-if="!$v.form.password.required">
          Password is required.
        </b-form-invalid-feedback>
        <b-form-invalid-feedback id="inputLiveFeedback" v-if="!$v.form.password.minLength">
          Name must have at least {{$v.form.password.$params.minLength.min}} letters.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="fieldsetHorizontal" horizontal :label-cols="2" breakpoint="md" label="Confirmed Password" label-for="inputHorizontal">
        <b-form-input v-model="form.confirmedPassword" type="password" placeholder="Enter your password again"  @input="$v.form.confirmedPassword.$touch()" :state="!$v.form.confirmedPassword.$error && null" aria-describedby="inputLiveHelp inputLiveFeedback"
        />
        <b-form-invalid-feedback id="inputLiveFeedback" v-if="!$v.form.confirmedPassword.sameAsPassword">
          Confirmed password must be the same with password.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-row class="my-2">
        <b-button type="submit" variant="success" @click="onRegister" class="mx-1" :disabled="$v.$invalid">Register</b-button>
        <b-button type="button" variant="warning" @click="onResetForm" class="mx-1">Reset</b-button>
        <b-button type="button" variant="info" @click="routeToBack" class="mx-1">Back</b-button>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import bForm from 'bootstrap-vue/es/components/form/form'
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import { validationMixin } from 'vuelidate'
import { email, required, sameAs, minLength } from 'vuelidate/lib/validators'
import UserService from '../services/user'

export default {
  components: {
    'b-form': bForm,
    'b-input-group': bInputGroup
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        confirmedPassword: ''
      }
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
    onRegister () {
      this.$store
        .dispatch('user/register', {
          email: this.form.email,
          password: this.form.password
        })
        .then(() => {
          this.$router.push('/')
        })
    },
    onResetForm () {
      this.form.email = ''
      this.form.password = ''
      this.form.confirmedPassword = ''
    },
    routeToBack () {
      this.$router.push('login')
    }
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmedPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  }
}
</script>

<style>
</style>
