<template>
    <b-table responsive striped hover :fields="fields" :items="links">
        <template slot="title" slot-scope="row">
            <a v-bind:href="row.item.url" target="_blank">{{row.item.title}}</a>
        </template>
        <template slot="isShared" slot-scope="row">
            <b-form-checkbox v-model="row.item.isShared" @change="toggleShareState(row.item)"></b-form-checkbox>
        </template>
        <template slot="actions" slot-scope="row">
          <b-button-group>
            <b-btn variant="success" size="sm" @click="routeToEditPage(row.item.id)">
                <i class="fas fa-edit"></i>
            </b-btn>
            <b-btn variant="danger" size="sm" @click="deleteLink(row.item.id)">
                <i class="fas fa-trash-alt"></i>
            </b-btn>
            <b-btn v-if="isTagNotEmptyOrDefined(row.item)" size="sm" @click.stop="row.toggleDetails" class="mr-2">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} <i class="fas fa-tags"></i>
            </b-btn>
          </b-button-group>
        </template>
        <template slot="row-details" slot-scope="row">
            <div class="tags-container">
                Tags : <b-badge class="tags" v-bind:key="index" v-for="(tag, index) in row.item.tags" variant="secondary">{{tag.tag}}</b-badge>
            </div>
        </template>
    </b-table>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
import bBadge from 'bootstrap-vue/es/components/badge/badge'
import _ from 'lodash'

export default {
  props: ['links'],
  components: {
    'b-badge': bBadge
  },
  data () {
    return {
      fields: [
        {
          key: 'title',
          label: 'Title'
        },
        {
          key: 'updateAt',
          label: 'Last modified',
          formatter: (value) => {
            return moment(value).format('LLL')
          }
        },
        {
          key: 'isShared',
          label: 'Is shared?',
          formatter: (value) => {
            return (value === true) ? 'Shared' : 'Click to share'
          }
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      toggleShareState: 'link/toggleShareLink',
      deleteLink: 'link/deleteLink'
    }),
    routeToEditPage (id) {
      const path = '/edit_link/' + id
      this.$router.push({path: path})
    },
    isTagNotEmptyOrDefined (link) {
      return !_.isUndefined(link.tags) || !_.isEmpty(link.tags)
    }
  }
}
</script>

<style>
    .tags-container{
        margin: 3px;
    }
    .tags{
        margin: 0 3px;
    }
</style>