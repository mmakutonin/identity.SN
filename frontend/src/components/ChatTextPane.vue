<template>
    <div class='w3-container w3-orange'>
        Hi from ChatTextPane
        <h1> {{currentContact.name}} </h1>
        <div
            v-for='chatMessage in currentChat'
            v-bind:key='chatMessage.timestamp'
            v-bind:class='"w3-card w3-round-xlarge w3-section " + color(chatMessage.sender)'
        >
            {{chatMessage.content}}
            {{new Date(chatMessage.timestamp)}}
        </div>
        <ChatTextPaneInput />
        <input
            type='button'
            class='w3-button w3-green'
            value='Meet Face-to-Face'
            v-on:click='this.videoChat'
        />
    </div>
</template>

<script>
import ChatTextPaneInput from './ChatTextPaneInput'
import { mapGetters, mapActions } from 'vuex'
export default {
    name:       'ChatTextPane',
    components: {
        ChatTextPaneInput
    },
    methods: {
        color(sender) {
            if(sender) {
                return 'w3-indigo'
            }
            else {
                return 'w3-grey'
            }
        },
        ...mapActions('chat', ['videoChat'])
    },
    computed: {
        ...mapGetters('chat', ['currentChat', 'currentContact'])
    }
}
</script>