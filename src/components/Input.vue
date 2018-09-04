<template>
<div class='form-group'>
    <li>
    <input class='addtask' v-model='item' placeholder='Add a task...' @keyup.enter='addItem'/>
    </li>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex';

export default {

    data(){
        return {
            item: ''
        }
    },
    computed: mapState([
        'displayName'
    ]),
    methods: {
        submit(){
            if(this.item !== ''){
                this.$emit('clicked', {item: this.item, list: this.$store.state.displayName})

                this.item = ''
            }
            else {
                alert("You didn't add anything.")
            }
            
        },
        ...mapMutations([
            'ADD_ITEM'
        ]),
        addItem: function(){
            let list = this.$store.state.displayName
            let item = this.item
            axios.post("/api/addtodo", {item: item, list: list}).then(() => {
                console.log('itema: ', item)
                this.ADD_ITEM(item)
            })
            this.item = ''
        }
    }
}

</script>

<style>
input.addtask {
    border: none;
    margin-left: 2vw;
    width: 100%;
    box-shadow: 0px 15px 178px -51px rgba(0,0,0,0.75);
}
input.addtask:focus {
    border: none;
    outline: none;
}
</style>