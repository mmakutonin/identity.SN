<template>
  <div class='w3-row-padding w3-center w3-indigo cust-login'>
    <div class='w3-half '>
      Let's Explore
      <br />Identity
    </div>
    <div class='w3-half'>
      <div class='w3-card w3-twothird w3-white w3-round-xlarge'>
        <LoginOAuthButton signInMethod='Google' />
        <LoginOAuthButton signInMethod='Facebook' />
      </div>
    </div>
  </div>
</template>

<script>
import LoginOAuthButton from '../components/LoginOAuthButton'
export default {
	name: 'Login',
	components: {
		LoginOAuthButton
	}
}
</script>
