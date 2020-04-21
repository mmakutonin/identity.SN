<template>
  <div v-bind:class="'w3-bar w3-border-bottom w3-border-red w3-mobile navbar ' + bgColor">
    <div class="nav-logo"><img src="../assets/ic-icon.png" /></div>

    <div class="nav-items">
      <a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-indigo w3-round"
        >Home</a
      >
      <a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-indigo w3-round"
        >Features</a
      >
      <a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-indigo w3-round"
        >About</a
      >
      <a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-indigo w3-round"
        >Contact</a
      >
      <input
        type='button'
        class='w3-bar-item w3-button w3-hover-none w3-hover-text-indigo w3-round'
        value='Settings'
        v-on:click='$router.push({path: "/settings"})'
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "MainNavBar",
  computed: {
    ...mapState(['bgColor'])
  }
};
</script>
