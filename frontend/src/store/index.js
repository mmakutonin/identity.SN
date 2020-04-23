import Vue from 'vue'
import Vuex from 'vuex'
import apiCalls from '../util/apiCalls'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: null,
        bgColor: 'w3-white'
    },
    getters: {
        darkMode: (state) => state.bgColor === 'w3-white' ? false : true
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.id
        },
        darkMode(state, payload) {
            if(payload.darkMode) {
                state.bgColor = 'w3-theme2'
            }
            else {
                state.bgColor = 'w3-white'
            }
        }
    },
    actions: {
        async logIn({ commit }, payload ) {
            window.open(`api/v1/auth/${payload.signInMethod}`, '_parent')
        }
    },
    modules: {
        accountSetup: {
            namespaced: true,
            state:      {
                //dummy data
                userId:          '',
                interestsAll:    {},
                interestsKnown:  {},
                identitiesAll:   {},
                identitiesKnown: {}
            },
            mutations: {
                populateUserMetadata(state, payload) {
                    state.userId = payload.userId
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
            },
            actions: {
                async getUserMetadata({ commit }, payload) {
                    console.log(payload)
                    const identitiesAll = await apiCalls.getIdentitiesAll(20)
                    const {identitiesKnown, interestsKnown} = await apiCalls.getUser(payload.id, true)
                    commit({
                        type: 'populateUserMetadata',
                        userId: payload.id,
                        identitiesAll,
                        interestsAll: identitiesAll,
                        interestsKnown,
                        identitiesKnown
                    })
                },
                addItem({ commit }, payload) {
                    const elementType = {
                        'identities': 'identity',
                        'interests': 'interest'
                    }[payload.elementType]
                    apiCalls.addUserItem(payload.item, elementType)
                    .then(res => commit({
                        type: 'elementAdd',
                        elementType: payload.elementType,
                        index: payload.item
                    }))
                },
                rmItem({ commit }, payload) {
                    const elementType = {
                        'identities': 'identity',
                        'interests': 'interest'
                    }[payload.elementType]
                    apiCalls.addUserItem(payload.item, elementType)
                    .then(res => commit({
                        type: 'elementRemove',
                        elementType: payload.elementType,
                        index: payload.item
                    }))
                }
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
                },
                //Actions to be expanded later can be found below:
                videoChat() {
                    window.open('https://hangouts.google.com/call/W7JggBBJ23loiAC0qUZkAEEE')
                },
                findMatch() {
                    console.log('"match is being found," sayeth the void.')
                }
            }
        }
    }
})