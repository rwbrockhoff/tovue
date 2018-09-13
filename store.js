import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        lists:{},
        complists:{},
        displayList: {},
        displayCompleted: {},
        displayName: '',
        sidebarList: [],
        idList: []
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
                let id = element.id
                let compload = element.itemscompleted
                state.lists[name] = load
                state.lists[name].id = id
                state.complists[name] = compload
                state.sidebarList.push(name)
            })
            state.displayList = state.lists.inbox
            state.displayCompleted = state.complists.inbox
            state.displayName = 'inbox'
        },
        CHANGE_LIST: (state, payload) => {
            state.displayList = state.lists[payload]
            state.displayCompleted = state.complists[payload]
            state.displayName = payload.toString()
        },
        COMPLETE_ITEM: (state, payload) => {
            state.displayList.splice(payload.id, 1)
            state.displayCompleted.push(payload.item)
        },
        DELETE_LIST: (state, payload) => {
        //    delete state.lists[payload]

        //    Find Index of List Name, remove from Sidebar Array
           let index = state.sidebarList.indexOf(payload)
           state.sidebarList.splice(index, 1)

        //    Update UI to Inbox List
           state.displayList = state.lists['inbox']
           state.displayCompleted = state.complists['inbox']
           state.displayName = 'inbox'
        }
    },
    actions: {
    
    },
    getters: {

    }
})