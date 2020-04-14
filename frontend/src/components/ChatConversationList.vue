<template>
    <div>
        <div
            v-for='(contact, index) in contacts'
            v-bind:key='contact.chatIndex'
            class='w3-card w3-container w3-section w3-border'
        >
            <input
                v-bind:value='contact.initials'
                v-bind:class='classStr(index)'
                v-on:click='changeCurrentContact({index})'
            />
            {{contact.lastMessage.content}}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:    'ChatConversationList',
    methods: {
        classStr(index) {
            const className = 'w3-btn w3-round '
            if(index === this.currentContactIndex) {
                return className + 'w3-blue'
            }
            else {
                return className + 'w3-light-blue'
            }
        },
        ...mapMutations('chat', [
            'changeCurrentContact'
        ])
    },
    computed: {
        ...mapState('chat', {
            contacts: state => state.contacts.map((contact) => ({
                ...contact,
                lastMessage: state.chats[contact.chatIndex][state.chats[contact.chatIndex].length - 1],
                initials:    contact.name.split(' ').reduce((agg, word) => agg + word[0], '').toUpperCase()
            })),
            currentContactIndex: state => state.currentContactIndex
        })
    }
}
</script>