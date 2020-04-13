<template>
<div>
    <input
        class='w3-button'
        v-bind:value='"Sign In With " + signInMethod'
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
