<template>
  <div v-bind:class="'w3-bar w3-mobile navbar ' + bgColor">
    <div class="nav-logo"><img src="https://cdn.dribbble.com/users/4083085/screenshots/11129161/media/cf345a4781d0eab30f9d3af589a801ce.png" /></div>

    <div class="nav-items">
      <a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-theme w3-round nav-item-li"
        >Home</a
      >
      <a
        href="#about-section"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-theme w3-round nav-item-li"
        >Features</a
      >
      <a
        href="#m-statement-section"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-theme w3-round nav-item-li"
        >About</a
      >
      <!--<a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-theme w3-round nav-item-li"
        >Contact</a
      >-->
      <input
        type='button'
        class='w3-bar-item w3-button w3-hover-none w3-hover-text-theme w3-round nav-item-li'
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
