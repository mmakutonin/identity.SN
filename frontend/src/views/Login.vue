<template>
  <div class="w3-row-padding w3-center">
    <div class="w3-twothird">
      Let's Explore
      <br />Identity
    </div>
    <div class="w3-third w3-card w3-round-xlarge">Hi from Login</div>
  </div>
</template>

<script>
import LoginOAuthButton from '../components/LoginOAuthButton'
export default {
	name: 'Login',
	components: [
		LoginOAuthButton

	]
}
</script>
