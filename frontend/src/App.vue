<template>
  <transition name="fade" mode="out-in">
    <router-view v-bind:class="bgColor" />
  </transition>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["bgColor"])
  }
};
</script>
