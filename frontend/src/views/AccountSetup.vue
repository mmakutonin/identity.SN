<template>
    <div>
        <AccountSetupScreen
            v-if='screenCounter === 0'
            message='Please tell us a bit about your identity'
            elementType='identities'
        />
        <AccountSetupScreen
            v-if='screenCounter === 1'
            message='Now can you select some of your interests?'
            elementType='interests'
        />
        <div class='w3-card'>
            <input
                type='button'
                class='w3-button'
                value='Previous'
                v-bind:disabled='screenCounter === 0'
                v-on:click='screenCounter--'
            />
            <input
                type='button'
                v-bind:class='"w3-button " + (screenCounter === 1 ? "w3-green" : "")'
                v-bind:value='(screenCounter === 1 ? "Lets Chat!" : "Next Page")'
                v-on:click='screenCounter++'
            />
        </div>
    </div>
</template>
<script>
import AccountSetupScreen from '../components/AccountSetupScreen'
export default {
    name:       'AccountSetup',
    components: { AccountSetupScreen },
    data:       () => ({
        screenCounter: 0
    }),
    watch: {
        screenCounter(newVal) {
            if(newVal > 1) {
                this.$router.push('chat')
            }
        }
    }
}
</script>