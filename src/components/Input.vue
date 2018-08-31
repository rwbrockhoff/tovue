<template>
<div class='form-group'>
    <li>
    <input class='addtask' v-model='item' placeholder='Add a task...' @keyup.enter='addItem'/>
    </li>
    
</div>
</template>

<script>
import axios from 'axios'
import {mapMutations} from 'vuex';

export default {

    data(){
        return {
            item: ''
        }
    },
    methods: {
        submit(){
            if(this.item !== ''){
                this.$emit('clicked', {item: this.item})

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
            axios.post("/api/addtodo", {item: this.item}).then(item => {
                this.ADD_ITEM(item.data[0])
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