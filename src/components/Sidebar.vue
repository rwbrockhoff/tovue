<template>
    <div class='sidecontainer'>
    <div class='userbar'>
     <img class="profilepic" v-if='user.sub' :src='user.picture'/>
     Hi, {{user.given_name}}
    </div>
    <div class='lists' v-for='(item, index) in this.$store.state.sidebarList' :key='index'>
      
          <p @click='changelist(item)'
          class='listmenuitem'> {{item}} </p> 
     
    </div>
    <div class='footerbar'>
        <img class='folder' src='../assets/folder.svg'/>
    </div>
    
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    name: 'Sidebar',
    data(){
        return {
            displayLists: []
        }
    },
    computed: ([
        'sidebarList'
    ]),
    methods: {
        ...mapMutations([
      'CHANGE_LIST'
    ]),
        changelist: function(item){
            this.CHANGE_LIST(item)
        }
    },
    props: ['user']
}
</script>

<style>
div.sidecontainer {
    width: 15vw;
    height: 100vh;
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
img.folder {
    width: 20px;
    margin-right: 10px;
}


@keyframes slidein {
  from {margin-left: -30vw; opacity: 0}
  to {margin-left: -3vw; opacity: 1}
}

</style>