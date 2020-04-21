<template>
  <div class="w3-container main">
    <MainNavBar />
    <div class="w3-row-padding w3-center cust-login">
      <div class="w3-half w3-mobile w3-display-container cust-full-height">
        <div
          class="w3-display-middle w3-text-white w3-round-xlarge w3-padding w3-animate-opacity cust-display-text"
        >
          <h2>Let's Explore</h2>
          <h1>Identity</h1>
        </div>
      </div>
      <div class="w3-half w3-display-container cust-full-height">
        <div
          v-bind:class="'w3-display-middle w3-card w3-round-xlarge cust-threequarter-height ' + bgColor"
        >
          <div class="w3-display-topmiddle w3-margin-top w3-animate-opacity login-card">
            <img
              src="../assets/ic-icon.png"
              id="app-icon"
              class="w3-image w3-hide-small w3-hover-grayscale"
            />
            <div id="log-in-subtitle">
              <h4>Log In:</h4>
              <p>Please use pick either options</p>
            </div>
            <LoginOAuthButton signInMethod="google" />
            <LoginOAuthButton signInMethod="facebook" />
          </div>
        </div>
      </div>
    </div>

    <LoginAboutSection />
    <LoginFooter />
  </div>
</template>

<script>
import LoginOAuthButton from "../components/LoginOAuthButton";
import MainNavBar from "../components/MainNavBar";
import LoginAboutSection from "../components/LoginAboutSection";
import LoginFooter from "../components/LoginFooter";
import { mapState } from 'vuex';
export default {
  name: "Login",
  components: {
    LoginOAuthButton,
    MainNavBar,
    LoginAboutSection,
    LoginFooter,
  },
  computed: {
    ...mapState(['bgColor'])
  }
};
</script>
