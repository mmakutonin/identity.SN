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
      class="w3-image cust-small-icon-image-dim1"
      src="http://pngimg.com/uploads/google/google_PNG19635.png"
    />
    <img
      v-if="signInMethod === 'facebook'"
      class="w3-image cust-small-icon-image-dim"
      src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
    />
    {{ "Sign In with " + signInMethod }}
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
