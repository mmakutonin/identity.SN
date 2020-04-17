import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userName: 'mikumaku'
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        accountSetup: {
            namespaced: true,
            state:      {
                //dummy data
                interestsAll:    { 1: 'Sports', 3: 'Buffalo', 934: 'LGBTQ+', 1102: 'Religion', 231: 'MasterChef' },
                interestsKnown:  {},
                identitiesAll:   { 3: 'Buffalo', 662: 'Bisexual', 1213: 'Jewish', 1234: 'Christian', 45612: 'Buffalo Bills' },
                identitiesKnown: {}
            },
            mutations: {
                populateUserMetadata(state, payload) {
                    state.interestsAll = payload.interestsAll
                    state.interestsKnown = payload.interestsKnown
                    state.identitiesAll = payload.identitiesAll
                    state.identitiesKnown = payload.identitiesKnown
                },
                elementAdd(state, payload) {
                    Vue.set( state[payload.elementType + 'Known'], payload.index, state[payload.elementType + 'All'][payload.index])
                },
                elementRemove(state, payload) {
                    Vue.delete(state[payload.elementType + 'Known'], payload.index)
                },
                interestAdd(state, payload) {
                    Vue.set(state.interestsKnown, state.interestsKnown.length, state.interestsAll[payload.index])
                },
                interestRemove(state, payload) {
                    Vue.set(state.interestsKnown, payload.index)
                },
            },
            actions: {
                // getUserMetadata({ commit }, payload) {
                //     //to be implemented

                // }
            }
        },
        chat: {
            namespaced: true,
            state:      {
                userName: 'Miku Macaroni',
                contacts: [
                    {
                        name:      'Bobby Nugs',
                        chatIndex: 0
                    },
                    {
                        name:      'Sammy Chainzzzz',
                        chatIndex: 1
                    }
                ],
                chats: [
                    [
                        {
                            sender:    false,
                            content:   'Hey Mike, how are you?',
                            timestamp: 1586900619779
                        },
                        {
                            sender:    true,
                            content:   'Yo, sup?',
                            timestamp: 1586900660000
                        },
                        {
                            sender:    false,
                            content:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
                            timestamp: 1586900710000
                        },
                        {
                            sender:    false,
                            content:   'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
                            timestamp: 1586900810000
                        },
                        {
                            sender:    true,
                            content:   'eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                            timestamp: 1586900910000
                        },  
                    ],
                    [
                        {
                            sender:    false,
                            content:   'Hey Mike, how are you?',
                            timestamp: 1586900619779
                        },
                        {
                            sender:    true,
                            content:   'Yo, yo, sup?',
                            timestamp: 1586900660000
                        },
                    ]
                ],
                currentContactIndex: 0
            },
            getters: {
                currentContact: (state) => state.contacts[state.currentContactIndex],
                currentChat:    (state, { currentContact }) => state.chats[currentContact.chatIndex]
            },
            mutations: {
                addMessage(state, payload) {
                    Vue.set(state.chats[payload.index], state.chats[payload.index].length, payload.chat)
                },
                changeCurrentContact(state, payload) {
                    state.currentContactIndex = payload.index
                }
            },
            actions: {
                sendMessage({ commit, getters }, payload) {
                    const chat = {
                        sender:    true,
                        content:   payload.messageText,
                        timestamp: Date.now()
                    }
                    commit({
                        type:  'addMessage',
                        chat,
                        index: getters.currentContact.chatIndex
                    })
                }
            }
        }
    }
})