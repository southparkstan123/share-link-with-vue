<template>
    <div>
        <loading v-if="isLoading"></loading>
        <link-form v-bind:link="link" v-bind:pageTitle="'Edit Link'" v-else></link-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bForm from 'bootstrap-vue/es/components/form/form'
import LinkForm from '../components/LinkForm'
import Loading from '../components/Loading'

export default {
  components: {
    'b-form': bForm,
    'link-form': LinkForm,
    'loading': Loading
  },
  computed: mapGetters({
    link: 'link/getLink',
    isLoading: 'siteConfig/getLoadingState'
  }),
  beforeMount () {
    this.$store.dispatch('siteConfig/loadingAction', true)
    setTimeout(() => {
      this.$store.dispatch('siteConfig/loadedAction', false)
    }, 1500)
  },
  mounted () {
    this.$store.dispatch({
      type: 'link/getLink',
      id: this.$route.params.id
    })
  }
}
</script>

<style>

</style>
