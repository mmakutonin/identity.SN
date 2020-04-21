<template>
  <router-view v-bind:class='bgColor'/>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['bgColor'])
  }
}
</script>
