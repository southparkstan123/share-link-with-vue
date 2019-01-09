<template>
    <div>
        <h1>{{ pageTitle }}</h1>
        <b-form @submit="onSubmit">
        <b-form-group id="exampleInputGroup1"
                        label="Title:"
                        label-for="title">
            <b-form-input id="exampleInput1"
                        type="text"
                        v-model="link.title"
                        :state="!$v.link.title.$error && null"
                        @input="$v.link.title.$touch()"
                        aria-describedby="inputLiveHelp inputLiveFeedback"
                        placeholder="Enter Title">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
                Title is required
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                        label="URL:"
                        label-for="url">
            <b-form-input id="exampleInput1"
                        type="text"
                        v-model="link.url"
                        :state="!$v.link.url.$error && null"
                        @input="$v.link.url.$touch()"
                        aria-describedby="inputLiveHelp inputLiveFeedback"
                        placeholder="Enter URL">
            </b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
                URL is required
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="exampleGroup3" label="Tags:" label-for="tags">
            <b-button variant="warning" @click="onAddTagInput">Add tag</b-button>
        </b-form-group>
        <b-form-group v-bind:key="index" v-for="(v, index) in $v.link.tags.$each.$iter">
            <b-input-group>
                <b-form-input
                  v-model.trim="v.tag.$model"
                  aria-describedby="inputLiveFeedback"
                  :state="!v.tag.$error && null"
                  @input="v.tag.$touch()"
                ></b-form-input>
                <b-input-group-append>
                  <b-btn variant="outline-danger" @click="onRemoveTagInput(index)">Delete</b-btn>
                </b-input-group-append>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  Tag is required
                </b-form-invalid-feedback>
            </b-input-group>
        </b-form-group>
        <b-form-group id="exampleGroup4">
            <b-form-checkbox id="isShared" v-model="link.isShared">
              Is Shared?
            </b-form-checkbox>
        </b-form-group>
        <b-button type="submit" variant="success" :disabled="$v.$invalid">Submit</b-button>
        <b-button @click="backToHome" variant="primary">Back To Home</b-button>
    </b-form>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import bForm from 'bootstrap-vue/es/components/form/form'

export default {
  props: ['link', 'pageTitle'],
  components: {
    'b-form': bForm
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      const action = (this.link.id) ? 'link/updateLink' : 'link/addLink'

      this.$store.dispatch(action, this.link).then(() => {
        this.$router.push('/')
      })
    },
    onAddTagInput () {
      if (this.link.tags === undefined) {
        this.link.tags = [{tag: ''}]
      } else {
        this.link.tags = this.link.tags.concat([{tag: ''}])
      }
    },
    onRemoveTagInput (index) {
      this.link.tags.splice(index, 1)
    },
    backToHome () {
      this.$router.go(-1)
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    link: {
      title: {
        required
      },
      url: {
        required
      },
      tags: {
        required,
        $each: {
          tag: {
            required
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
