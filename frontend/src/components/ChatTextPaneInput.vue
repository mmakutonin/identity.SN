<template>
    <div>
        <input
            type='text'
            class='w3-input'
            v-model='messageText'
        />
        <input
            type='button'
            value='Send >>>'
            class='w3-button w3-round-xlarge w3-green'
            v-on:click='send(messageText)'
            />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'ChatTextPaneInput',
    data: () => ({
        messageText: ''
    }),
    watch: {
        currentContactIndex() {
            this.messageText = ''
        }
    },
    methods: {
        ...mapActions('chat', ['sendMessage']),
        send( messageText ) {
            this.sendMessage({ messageText })
            this.messageText = ''
        }
    },
    computed: {
        ...mapState('chat', ['currentContactIndex'])
    }
}
</script>