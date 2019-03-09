<template>
    <div class="card">
        <div class="card-header">
            <div class="input-wrapper">
                <b-btn v-b-modal.link-form variant="success" size="sm" @click="routeToEditPage(link.id)">Edit</b-btn>
                <b-btn v-b-modal.link-form variant="danger" size="sm" @click="deleteLink(link.id)">Delete</b-btn>
                <b-btn v-b-modal.link-form variant="secondary" size="sm" @click="toggleShareState(link)">{{ link.isShared | shareButton }}</b-btn>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title">
                {{ link.title }}</h5>
            <p class="card-text">
                <a v-bind:href="link.url" target="_blank">Link</a>
            </p>
            <b-badge v-bind:key="index" v-for="(tag, index) in link.tags" variant="secondary">{{tag.tag}}</b-badge>
        </div>
        <div class="card-footer">
            Last modified : {{ link.updateAt | toString }}
        </div>
    </div>
</template>

<script>
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  props: ['link'],
  components: {
    'b-badge': bBadge
  },
  filters: {
    toString: function (value) {
      return moment(value).fromNow()
    },
    shareButton: function (value) {
      return (value === true) ? 'Shared' : 'Click to share'
    }
  },
  methods: {
    ...mapActions({
      toggleShareState: 'link/toggleShareLink'
    }),
    routeToEditPage (id) {
      const path = '/edit_link/' + id
      this.$router.push({path: path})
    },
    deleteLink (id) {
      const modalObj = {
        title: 'Delete Link',
        message: 'Are you sure to delete this link ?',
        type: 'confirm',
        action_type: 'link/deleteLink',
        payload: {id}
      }
      this.$store.commit('modal/openModal', modalObj, { root: true })
    }
  }
}
</script>

<style>
    .card{
        margin: 10px;
    }
    .badge{
        margin: 1px;
    }
</style>
