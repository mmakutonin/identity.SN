<template>
<div>
    <input
        class='w3-button w3-section w3-round-large w3-border'
        v-bind:value='"Sign In With " + signInMethod'
		v-on:click='signIn()'
    />
</div>
</template>

<script>
export default {
	name: 'LoginOauthButton',
	props: {
		signInMethod: String
	},
	methods: {
		signIn () {
			console.log('Sign In Called')
		}
	}
}
</script>
