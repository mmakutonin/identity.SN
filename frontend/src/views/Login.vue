<template>
  <div class="w3-container main">
    <MainNavBar />
    <div class="w3-row-padding w3-center w3-theme-d5 cust-login">
      <div class="w3-half w3-display-container cust-full-height">
        <div
          class="w3-mobile w3-padding w3-display-middle w3-round-xlarge w3-animate-opacity cust-display-text"
        >
          <h1>identity.SN</h1>
          <p class="vp-txt">
            A social network that helps to facilitate real connections between
            people with diverse backgrounds by matching users for<br />
            <b>one-on-one</b> 24-hour chats
          </p>
          <br />
          <h3>Get Matched Now!</h3>
          <LoginOAuthButton signInMethod="google" />
          <p>or</p>
          <LoginOAuthButton signInMethod="facebook" />
          <!--<p>Your personal information will remain secured as your identity will be kept anonymous</p>-->
        </div>
      </div>

      <div
        class="w3-half w3-hide-small w3-display-right w3-container main-pic-section"
      >
        <img
          src="https://static-2.gumroad.com/res/gumroad/1211634803146/asset_previews/10d376519ed6e83192a8606b66135312/retina/thumbnail.png"
          alt="main-pic-person-holding-phone"
          class="w3-round-xlarge w3-image main-pic"
        />
      </div>
    </div>
    <LoginAboutSection />
    <LoginMissionState />
    <LoginFooter />
  </div>
</template>

<script>
import LoginOAuthButton from "../components/LoginOAuthButton";
import MainNavBar from "../components/MainNavBar";
import LoginAboutSection from "../components/LoginAboutSection";
import LoginFooter from "../components/LoginFooter";
import LoginMissionState from "../components/LoginMissionState";
import { mapState } from "vuex";
export default {
  name: "Login",
  components: {
    LoginOAuthButton,
    MainNavBar,
    LoginAboutSection,
    LoginMissionState,
    LoginFooter,
  },
  computed: {
    ...mapState(["bgColor"]),
  },
};
</script>
