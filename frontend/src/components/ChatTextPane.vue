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
    </div>
</template>

<script>
import ChatTextPaneInput from './ChatTextPaneInput'
import { mapGetters } from 'vuex'
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
        }
    },
    computed: {
        ...mapGetters('chat', ['currentChat', 'currentContact'])
    }
}
</script>