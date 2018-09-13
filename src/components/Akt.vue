<template>
<div class='outerakt'>
  <div id="akt">
    <div class='header'>
      <h2>{{displayName}}</h2>
        <div class='menuitems'>
           <i class="far fa-star"/> 
          <i class="far fa-trash-alt" data-toggle="modal" data-target="#exampleModalCenter"/> 
         </div>

         
           
    </div>
    
    <Input @clicked='add'/>
    <List @clicked='handle' :completed='completed'/>
    </div>
    <div class='side'>
    <Sidebar :user='user'/>
    
    </div>
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Delete {{displayName}} list?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are you sure?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button 
        @click='deletelistlocal'
        type="button" class="btn btn-danger"
        >Delete {{displayName}}</button>
      </div>
    </div>
  </div>
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
      toggleMenu: false
    }
  },
  computed: mapState([
    'displayList', 'displayName', 'lists'
  ]),
  methods: {
    ...mapMutations([
      'ADD_LIST', 'DELETE_ITEM', 'COMPLETE_ITEM', 'DELETE_LIST'
    ]),
    addList: function(list){
      this.ADD_LIST(list)
    },
    deleteItem: function(id){
      this.DELETE_ITEM(id)
    },

    deleteList: function(id){
      this.DELETE_LIST(id)
    },
    completeItem: function(obj){
      this.COMPLETE_ITEM(obj)
    },
    add(item){
      this.list.push({todo: item.item})
      axios.post("/api/addtodo", {item: item.item})
  
    },
    deletelistlocal(){
      let listid = this.lists[this.displayName].id
      
      axios.delete(`/api/deletelist?listid=${listid}`).then(() => {
        this.deleteList(listid)
        $('#exampleModalCenter').modal('hide')
      })

    },
    handle(obj){
      if(obj.val.index >= 0){
      var newItem = this.list.slice(obj.val.index, ++obj.val.index)
      this.list.splice(--obj.val.index, 1)
      this.list.unshift(newItem[0])
      }
      else if(obj.val.completed >= 0){
        let list = this.$store.state.displayName
        let item = this.$store.state.displayList[obj.val.completed]
        let id = obj.val.completed
        var e = document.getElementsByClassName('checkitem')[id]
        e.checked = false;
        axios.put('/api/completetodo', {id: id, item: item, list: list})
        this.completeItem({id: id, item: item})
      }
      else if(obj.val.delete >= 0){
        let list = this.$store.state.displayName
        let id = obj.val.delete
        
        axios.delete(`/api/${list}/${id}`).then(() => {
          this.deleteItem(id)
        })
      }
    },
    togglemenu(){
      this.toggleMenu = !this.toggleMenu
    },
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
  overflow-y: scroll;
}
#akt {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 3vh 2vw;
  height: 100vh;
  width: 85vw;
  position: fixed;
  right: 0;
  top: 5px;
   overflow-y: scroll;
}
div.header {
  padding: 10px 0px;
  color: white;
  text-align: left;
  padding-left: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}



div.header i {
  margin-right: 60px;
}

div.menuitems {
  display: flex;
  justify-content: space-evenly;
  width: 100px;
  background: white; opacity: 0.8;
  margin-right: 60px;
  border-radius: 20px;
  overflow: hidden;
}
div.menuitems i {
  margin-right: 0px;
  padding: 10px 20px;
  color: black;
}
div.menuitems i:hover {
  background: #f0efef;


}






</style>
