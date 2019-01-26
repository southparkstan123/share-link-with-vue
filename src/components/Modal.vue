<template>
    <b-modal :visible="modalObj.show" no-close-on-esc no-close-on-backdrop hide-header-close hide-footer centered :title="modalObj.title" :header-bg-variant="modalObj.code ? this.mapCodeToClass(modalObj.code) : 'light'">
      <div class="modal-body d-block">
        <p class="my-4">{{modalObj.message}}</p>
      </div>
      <div v-if="modalObj.type ==='confirm'" class="d-block float-right">
        <b-btn variant="warning" @click="doCancel">Cancel</b-btn>
        <b-btn variant="success" @click="doConfirm">OK</b-btn>
      </div>
      <div v-else class="d-block float-right">
        <b-btn variant="success" @click="doCancel">OK</b-btn>
      </div>
    </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    modalObj: 'modal/getModalObj'
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
    doCancel () {
      this.$store.commit('modal/closeModal')
    },
    doConfirm () {
      this.$store.dispatch(this.modalObj.action_type, this.modalObj.payload).then(() => {
        this.$store.commit('modal/closeModal')
      })
    }
  }
}
</script>

<style>

</style>
