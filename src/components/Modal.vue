<template>
    <b-modal :visible="modalObj.show" no-close-on-esc no-close-on-backdrop hide-header-close hide-footer centered title='Infomation' :header-bg-variant="modalObj.code ? this.mapCodeToClass(modalObj.code) : 'info'">
      <div class="modal-body d-block">
        <p class="my-4">{{modalObj.message}}</p>
      </div>
      <div class="d-block float-right">
        <b-btn variant="secondary" @click="doConfirm">OK</b-btn>
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
      console.log('Cancel and modal to be closed!')
      this.$store.commit('modal/closeModal')
    },
    doConfirm () {
      console.log('Confirm and modal to be closed!')
      this.$store.commit('modal/closeModal')
    }
  }
}
</script>

<style>

</style>
