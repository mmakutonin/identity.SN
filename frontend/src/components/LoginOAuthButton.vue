<template>
	<div class='w3-mobile w3-button w3-section w3-round-xlarge w3-border w3-center w3-hover-indigo loginOAuth-button' v-on:click='signIn()'>
		<img
			v-if='signInMethod === "Google"'
			class='w3-image cust-small-icon-image-dim'
			src='../assets/google-icon.png'
		/>
		<img
			v-if='signInMethod === "Facebook"'
			class='w3-image cust-small-icon-image-dim'
			src='../assets/facebook-icon.png'
		/>
		{{'Sign In With ' + signInMethod}}
	</div>
</template>

<script>
export default {
    name:  'LoginOauthButton',
    props: {
        signInMethod: String
    },
    methods: {
        signIn() {
            console.log('Sign In Called')
            this.$router.push('/fill-info')
        }
    }
}
</script>