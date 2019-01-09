<template>
    <div class="row">
        <div class="col-lg-6 col-xl-4" v-bind:key="link.id" v-for="link in links">
            <link-item v-bind:link="link"></link-item>
        </div>
    </div>
</template>

<script>
import LinkItem from './LinkItem'
export default {
  props: ['links'],
  components: {
    'link-item': LinkItem
  }
}
</script>
