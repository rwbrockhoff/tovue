<template>
    <div class='sidecontainer'>
    <div class='userbar'>
     <img class="profilepic" v-if='user.sub' :src='user.picture'/>
     Hi, {{user.given_name}}
    </div>
    <div class='lists' v-for='(item, index) in this.$store.state.sidebarList' :key='index'>
      
          <p @click='changelist(item)'
          class='listmenuitem'> 
          {{item}} </p> 
                 
     
    </div>
    <div class='footerbar' >
        <!-- Button trigger modal -->
<button type="button" class='addlistbutton' data-toggle="modal" data-target="#addlistmodal">
  <img class='folder' src='../assets/folder.svg'/>
</button>

<!-- Modal -->
<div class="modal fade" id="addlistmodal" tabindex="-1" role="dialog" aria-labelledby="addlistmodalTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add A List</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model='newlist'>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button @click='addlist' type="button" class="btn btn-primary">Add List</button>
      </div>
    </div>
  </div>
</div>
    </div>
    
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
export default {
    name: 'Sidebar',
    data(){
        return {
            displayLists: [],
            newlist: ''
        }
    },
    computed: ([
        'sidebarList', 'lists'
    ]),
    methods: {
        ...mapMutations([
      'CHANGE_LIST'
    ]),
        changelist: function(item){
            this.CHANGE_LIST(item)
        },
        addlist: function(){
            axios.put('/api/addlist', {newlist: this.newlist}).then((response) => {
                console.log('res', response.data[0])
                this.$store.state.sidebarList.push(response.data[0].list)
                this.$store.state.lists[response.data[0].list] = response.data[0].items
                this.$store.state.complists[response.data[0].list] = response.data[0].itemscompleted

            })
            $('#addlistmodal').modal('hide')
            this.newlist = ''
        }
    },
    props: ['user']
}
</script>

<style>
div.sidecontainer {
    width: 15vw;
    height: 100vh;
    max-height: 100vh;
    overflow-y: scroll;
    margin-top: -3vh;
    margin-left: -3vw;
    opacity: 100;
    background-color: #f7f5f5;
    box-shadow: 21px 0px 47px -34px rgba(0,0,0,0.75);
    animation: slidein 0.5s linear;
    
}
img.profilepic {
  width: 30px;
  border-radius: 10px;
margin-right: 10px;
}
div.userbar {
    width: 100%;
    background-color: #f2f1f1;
    height: 7vh;
    margin-bottom: -15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

div.lists {
    margin-top: 15px;
}
p.listmenuitem {
    width: 100%;
    height: 50px;
    font-weight: 700;
    margin: -15px 0px;
    display: flex;
    justify-content: center;
    align-items: center;  
    
}

p.add {
    font-size: 1.5em;
}

p.listmenuitem:hover {
    background: #f2f1f1;
}

div.footerbar {
    bottom: 0;
    height: 40px;
    width: 15vw;
    position: absolute;
    background: #f2f1f1;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
div.footerbar:hover {
    height: 60px;
}

div.footerbar:hover img.folder {
    width:30px;
}
img.folder {
    width: 20px;
}
button.addlistbutton {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: #f2f1f1;

}


@keyframes slidein {
  from {margin-left: -30vw; opacity: 0}
  to {margin-left: -3vw; opacity: 1}
}

</style>