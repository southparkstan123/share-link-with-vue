<template>
    <div v-if="messageObj.show">
        <b-alert show dismissible @dismissed="closeAlert" :variant="this.mapCodeToClass(messageObj.code)">
            {{ messageObj.message }}
        </b-alert>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    messageObj: 'message/getMessageObj'
  }),
  methods: {
    mapCodeToClass (code) {
      switch (code) {
        case '200':
          return 'success'
        default:
          return 'danger'
      }
    },
    closeAlert () {
      this.$store.commit('message/closeMessage')
    }
  }
}
</script>

<style>

</style>
