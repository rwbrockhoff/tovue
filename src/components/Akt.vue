<template>
<div class='outerakt'>
  <div id="akt">
    <Input @clicked='add'/>
    <List @clicked='handle' :completed='completed'/>
    </div>
    <div class='side'>
    <Sidebar :user='user'/>
    
    </div>
  </div>

</template>

<script>
import Input from './Input'
import List from './List'
import Sidebar from './Sidebar'
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'

export default {
  name: "akt",
  data(){
    return {
      user: {},
      completed: [],
    }
  },
  computed: mapState([
    'displayList, displayName'
  ]),
  methods: {
    ...mapMutations([
      'ADD_LIST', 'DELETE_ITEM'
    ]),
    addList: function(list){
      this.ADD_LIST(list)
    },
    deleteItem: function(id){
      this.DELETE_ITEM(id)
    },
    add(item){
      this.list.push({todo: item.item})
      axios.post("/api/addtodo", {item: item.item})
  
    },
    handle(obj){
      if(obj.val.index >= 0){
        
      var newItem = this.list.slice(obj.val.index, ++obj.val.index)
      this.list.splice(--obj.val.index, 1)
      this.list.unshift(newItem[0])
      }
      else if(obj.val.completed >= 0){
         this.completed.push(this.list[obj.val.completed])
        this.list.splice(obj.val.completed, 1)
      }
      else if(obj.val.delete >= 0){
        let list = this.$store.state.displayName
        let id = obj.val.delete
        
        axios.delete(`/api/${list}/${id}`).then(() => {
          this.deleteItem(id)
        })
      }
    }
  },
  components: {
    Input, List, Sidebar
  },
  mounted: function(){
    axios.get('api/user').then(info => {
      this.user = info.data.user
      axios.get('/api/getitems').then(lists => {
        this.addList(lists.data)
      })
    })
    if (!user.sub){
      this.$router.push("/")
    }
  }
};
</script>

<style>
div.outerkt {
  display: flex;

}
#akt {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 3vh 2vw;
  height: 90vh;
  width: 85vw;
  position: fixed;
  right: 0;
  top: 5px;
}




</style>
