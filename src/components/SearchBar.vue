<template>
  <div id="search-bar">
    <b-input-group prepend='Input your Tag'>
      <b-form-input v-model="keyword" type="text" @input="onChangeKeyword(keyword)"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info" @click="resetKeyword()">Reset</b-btn>
        </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
import bButton from 'bootstrap-vue/es/components/button/button'
import bBadge from 'bootstrap-vue/es/components/badge/badge'

export default {
  components: {
    'b-input-group': bInputGroup,
    'b-button': bButton,
    'b-badge': bBadge
  },
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    onChangeKeyword (keyword) {
      this.$store.dispatch('link/searchLinkByTag', keyword)
      this.keyword = keyword
    },
    resetKeyword () {
      this.$store.dispatch('link/searchLinkByTag', '')
      this.keyword = ''
    }
  }
}
</script>

<style>
    #search-bar{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .input-group{
      margin-bottom: 10px;
    }
    .tag-btn{
      margin: 0 3px;
    }
</style>
