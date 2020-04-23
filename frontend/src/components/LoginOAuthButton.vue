<template>
  <div
    v-bind:class="
      'w3-mobile w3-button w3-section w3-round-xlarge w3-center w3-hover-theme loginOAuth-button ' +
        bgColor
    "
    v-on:click="logIn({ signInMethod })"
  >
    <img
      v-if="signInMethod === 'google'"
      class="w3-image cust-small-icon-image-dim"
      src="../assets/google-icon.png"
    />
    <img
      v-if="signInMethod === 'facebook'"
      class="w3-image cust-small-icon-image-dim"
      src="../assets/facebook-icon.png"
    />
    {{ "Sign In With " + signInMethod }}
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {mapState} from 'vuex';
export default {
  name: "LoginOauthButton",
  props: {
    signInMethod: String,
  },
  methods: {
    ...mapActions(["logIn"]),
  },
  computed: {
    ...mapState(["bgColor"]),
  }
};
</script>
