<template>
  <div class="w3-container main">
    <MainNavBar />
    <div class="w3-row-padding w3-center cust-login">
      <div class="w3-half w3-display-container cust-full-height">
        <div
          class="w3-display-middle w3-text-white w3-round-xlarge w3-padding cust-display-text"
        >
          <h2>Let's Explore</h2>
          <h1>Identity</h1>
          <a href="#">
            <p>Try now</p>
          </a>
        </div>
      </div>
      <div class="w3-half w3-display-container cust-full-height">
        <div
          class="w3-display-middle w3-card w3-twothird w3-white w3-round-xlarge cust-threequarter-height"
        >
          <div class="w3-display-topmiddle w3-margin-top login-card">
            <img
              src="../assets/ic-icon.png"
              id="app-icon"
              class="w3-image w3-hover-grayscale"
            />
            <div id="log-in-subtitle">
              <h4>Log In:</h4>
              <p>Please use pick either options</p>
            </div>
            <LoginOAuthButton signInMethod="Google" />
            <LoginOAuthButton signInMethod="Facebook" />
            <p>Don't have an account? <a href="#">Join Now</a></p>
          </div>
        </div>
      </div>
    </div>

    <LoginAboutSection />
  </div>
</template>

<script>
import LoginOAuthButton from "../components/LoginOAuthButton";
import MainNavBar from "../components/MainNavBar";
import LoginAboutSection from "../components/LoginAboutSection";
export default {
  name: "Login",
  components: {
    LoginOAuthButton,
    MainNavBar,
    LoginAboutSection,
  },
};
</script>
