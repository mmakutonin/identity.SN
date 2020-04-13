import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        AccountSetup: {
            state: {
                //dummy data
                interestsAll:    ['Sports', 'Buffalo', 'LGBTQ+', 'Religion', 'MasterChef'],
                interestsKnown:  [],
                identitiesAll:   ['Buffalo', 'Bisexual', 'Jewish', 'Christian', 'Buffalo Bills'],
                identitiesKnown: []
            },
            mutations: {
                populateUserMetadata(state, payload) {
                    state.interestsAll = payload.interestsAll
                    state.interestsKnown = payload.interestsKnown
                    state.identitiesAll = payload.identitiesAll
                    state.identitiesKnown = payload.identitiesKnown
                },
                identityAdd(state, payload) {
                    Vue.set(state.identitiesKnown, state.identitiesKnown.length, state.identitiesAll[payload.index])
                },
                identityRemove(state, payload) {
                    Vue.delete(state.identitiesKnown, payload.index)
                },
                interestAdd(state, payload) {
                    Vue.set(state.interestsKnown, state.interestsKnown.length, state.interestsAll[payload.index])
                },
                interestRemove(state, payload) {
                    Vue.set(state.interestsKnown, payload.index)
                },
            },
            actions: {
                getUserMetadata({commit}, payload) {
                    //to be implemented

                }
            }
        }
    }
})