import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        lists:{},
        displayList: {},
        displayCompleted: {},
        displayName: '',
        displayNameCompleted: '',
        sidebarList: []
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.displayList.push(item)
        },
        DELETE_ITEM: (state, id) => {
            state.displayList.splice(id, 1)
        },
        ADD_LIST: (state, payload) => {
            payload.forEach((element, index) => {
                let name = element.list
                let load = element.items
                state.lists[name] = load
                if(element.list.indexOf('_comp')===-1){
                    state.sidebarList.push(name)
                }   
            })
            state.displayList = state.lists.inbox
            state.displayCompleted = state.lists.inbox_comp
            state.displayName = 'inbox'
            state.displayNameCompleted = 'inbox_comp'
        },
        COMPLETE_ITEM: (state, payload) => {
            state.displayList.splice(payload.id, 1)
            state.displayCompleted.push(payload.item)
        }
    },
    actions: {
    
    },
    getters: {

    }
})