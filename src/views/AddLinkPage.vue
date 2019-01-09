<template>
    <div>
        <link-form v-bind:link="link" v-bind:pageTitle="'Add Link'"></link-form>
    </div>
</template>

<script>
import bForm from 'bootstrap-vue/es/components/form/form'
import LinkForm from '../components/LinkForm'

export default {
  components: {
    'b-form': bForm,
    'link-form': LinkForm
  },
  data () {
    return {
      isLoading: true,
      link: {
        title: '',
        url: '',
        isShared: false,
        tags: []
      }
    }
  }
}
</script>

<style>

</style>
