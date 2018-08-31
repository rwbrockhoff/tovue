import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store ({
    state: {
        list: [],
        gurgle: ''
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.gurgle = 'runner'
            state.list.push(item)
        },
        ADD_LIST: (state, payload) => {
            state.list = [...payload]
        }
    },
    actions: {
    
    },
    getters: {

    }
})