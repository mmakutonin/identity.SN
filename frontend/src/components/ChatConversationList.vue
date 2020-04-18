<template>
    <div class='w3-pink'>
        Hi From ChatConversationList
        <input
            type='button'
            class='w3-button w3-green'
            value='Find a New Match'
            v-on:click='searchForMatch()'
        />
        <div
            v-for='(contact, index) in contacts'
            v-bind:key='contact.chatIndex'
            class='w3-card w3-container w3-section w3-border'
        >
            <input
                type='button'
                v-bind:value='contact.initials'
                v-bind:class='"w3-button w3-circle " + color(index)'
                v-on:click='changeCurrentContact({index})'
            />
            {{contact.lastMessage.content}}
        </div>
        <div v-if='alertDisplayed'>
            Please style me as an alert, @bobby-san!
            {{alertMessage}}
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'ChatConversationList',
    data: () => ({
        alertDisplayed: false,
        alertMessage:   ''
    }),
    watch: {
        alertDisplayed(val) {
            if(val) {
                setTimeout(() => {
                    this.alertDisplayed = false
                    this.alertMessage = ''
                }, 10000)
            }
        }
    },
    methods: {
        ...mapMutations('chat', [
            'changeCurrentContact'
        ]),
        ...mapActions('chat', ['findMatch']),
        color(index) {
            if(index === this.currentContactIndex) {
                return 'w3-blue'
            }
            else {
                return 'w3-light-blue'
            }
        },
        searchForMatch() {
            this.findMatch()
            this.alertMessage = 'Your match is being searched for. This can sometimes take a while, but we\'ll let you know as soon as we find them!'
            this.alertDisplayed = true
        }
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