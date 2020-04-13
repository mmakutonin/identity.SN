<template>
  <div class='w3-row-padding w3-center w3-indigo cust-login'>
    <div class='w3-half w3-display-container cust-full-height'>
      <div class='w3-display-middle w3-text-white w3-round-xlarge w3-padding'>
        <h3>Let's Explore </h3>
        <h1> Identity </h1>
      </div>
    </div>
    <div class='w3-half w3-display-container cust-full-height'>
      <div class='w3-display-middle w3-card w3-twothird w3-white w3-round-xlarge cust-threequarter-height'>
        <LoginOAuthButton signInMethod='Google' />
        <LoginOAuthButton signInMethod='Facebook' />
      </div>
    </div>
  </div>
</template>

<script>
import LoginOAuthButton from '../components/LoginOAuthButton'
export default {
    name:       'Login',
    components: {
        LoginOAuthButton
    }
}
</script>