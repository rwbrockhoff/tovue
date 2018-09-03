<template>
    <div class='sidecontainer'>
    <div class='userbar'>
     <img class="profilepic" v-if='user.sub' :src='user.picture'/>
    Hey, {{user.given_name}}
    </div>
    <div class='lists' v-for='(item, index) in this.$store.state.sidebarList' :key='index'>
       <p class='listmenuitem'> {{item}} </p>
    </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
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
    background-color: #E2E2E2;
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

p.listmenuitem:hover {
    background: #f2f1f1;
}

@keyframes slidein {
  from {margin-left: -30vw; opacity: 0}
  to {margin-left: -3vw; opacity: 1}
}

</style>