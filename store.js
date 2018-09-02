import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        lists:{},
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
            payload.forEach(element => {
                let name = element.list
                let load = element.items
                state.lists[name] = load
            })
            state.displayList = state.lists.inbox
            state.displayCompleted = state.lists.inbox_comp
            state.displayName = 'inbox'
            state.displayNameCompleted = 'inbox_comp'
        }
    },
    actions: {
    
    },
    getters: {

    }
})