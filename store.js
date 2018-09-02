import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        inbox: {},
        inboxcomp: {},
        displayList: {},
        displayCompleted: {},
        displayName: '',
        displayNameCompleted: ''
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.displayList.push(item)
        },
        DELETE_ITEM: (state, id) => {
            state.displayList.splice(id, 1)
        },
        ADD_LIST: (state, payload) => {
            state.inbox = payload
            state.displayList = [...state.inbox]
            state.displayName = 'inbox'
            state.displayNameCompleted = 'inboxcomp'
        }
    },
    actions: {
    
    },
    getters: {

    }
})