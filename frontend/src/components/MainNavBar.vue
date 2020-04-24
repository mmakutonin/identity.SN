<template>
  <header v-bind:class="'navbar ' + bgColor">
    <a href="#" class="w3-hover-text-theme nav-logo">identity.SN</a>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"
      ><span class="navicon"></span
    ></label>
    <ul v-bind:class="'nav-items ' + bgColor">
      <li>
        <a href="#" class="w3-hover-none w3-hover-text-theme w3-border-top nav-item-li"
          >Home</a
        >
      </li>
      <li>
        <a
          href="#about-section"
          class="w3-hover-none w3-hover-text-theme w3-border-top nav-item-li"
          >Features</a
        >
      </li>
      <li>
        <a
          href="#m-statement-section"
          class="w3-hover-none w3-hover-text-theme w3-border-top nav-item-li"
          >About</a
        >
      </li>
      <!--<a
        href="#"
        class="w3-bar-item w3-button w3-hover-none w3-hover-text-theme w3-round nav-item-li"
        >Contact</a
      >-->
      <li>
        <a
          class="w3-hover-none w3-hover-text-theme w3-border-top nav-item-li"
          v-on:click="$router.push({ path: '/settings' })"
          >Settings</a
        >
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainNavBar",
  computed: {
    ...mapState(["bgColor"]),
  },
};
</script>
