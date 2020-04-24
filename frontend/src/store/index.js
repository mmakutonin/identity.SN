import Vue from 'vue'
import Vuex from 'vuex'
import apiCalls from '../util/apiCalls'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: null,
        bgColor: 'w3-theme2'
    },
    getters: {
        darkMode: (state) => state.bgColor === 'w3-theme2' ? false : true
    },
    mutations: {
        setUser(state, payload) {
            state.userId = payload.id
        },
        darkMode(state, payload) {
            if(payload.darkMode) {
                state.bgColor = 'w3-white'
            }
            else {
                state.bgColor = 'w3-theme2'
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
                addItem({ state, commit }, payload) {
                    const elementType = {
                        'identities': 'identity',
                        'interests': 'interest'
                    }[payload.elementType]
                    apiCalls.addUserItem(payload.item, elementType, state.userId)
                    .then(res => commit({
                        type: 'elementAdd',
                        elementType: payload.elementType,
                        index: payload.item
                    }))
                },
                rmItem({ state, commit }, payload) {
                    const elementType = {
                        'identities': 'identity',
                        'interests': 'interest'
                    }[payload.elementType]
                    apiCalls.addUserItem(payload.item, elementType. state.userId)
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
                userName: '',
                rooms: [],
                currentContactIndex: 0
            },
            getters: {
                currentRoom: (state) => state.rooms.length > 0 ? state.rooms[state.currentContactIndex] :  '',
                currentChat:    (state, { currentRoom }) => currentRoom.messages,
                currentChatPartnerId: (state, {currentRoom}) => currentRoom.id
            },
            mutations: {
                addMessage(state, payload) {
                    Vue.set(state.rooms[payload.index].messages, state.rooms[payload.index].messages.length, payload.chat)
                },
                changeCurrentContact(state, payload) {
                    state.currentContactIndex = payload.index
                },
                setUserId(state, payload) {
                    state.userName = payload.userId
                },
                addRoom(state, payload) {
                    Vue.set(state.rooms, state.rooms.length, payload.room)
                },
                setRooms(state, payload) {
                    state.rooms = payload.rooms
                },
                refreshCurrentRoom(state, payload) {
                    Vue.set(state.rooms, payload.index, payload.room)
                }
            },
            actions: {
                async initChats({commit}, payload) {
                    commit({
                        type: 'setUserId',
                        userId: payload.userId
                    })
                    commit({
                        type: 'setRooms',
                        rooms: await apiCalls.getRooms(payload.userId)
                    })
                },
                async sendMessage({ state, commit, getters }, payload) {
                    const chat = {
                        sender:     true,
                        toId:       getters.currentChatPartnerId,
                        fromId:     state.userName,
                        message:    payload.messageText,
                        timestamp:  Date.now()
                    }
                    const tone = await apiCalls.sendMessage(chat)
                    commit({
                        type:  'addMessage',
                        chat: {...chat, tone},
                        index: state.currentContactIndex
                    })
                    
                },
                //Actions to be expanded later can be found below:
                videoChat() {
                    window.open('https://hangouts.google.com/call/W7JggBBJ23loiAC0qUZkAEEE')
                },
                async findMatch({ state, commit, dispatch }) {
                    await apiCalls.findMatch(state.userName)
                    dispatch({
                        type:'initChats',
                        userId: state.userName
                    })
                },
                async refreshRooms({ state, dispatch, commit }) {
                    const rooms = await apiCalls.getRooms(state.userName)
                    commit({
                        type: 'setRooms',
                        rooms
                    })
                    setTimeout(() => {
                        dispatch('refreshRooms')
                    }, 2000)
                }
            }
        }
    }
})