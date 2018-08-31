<template>
    <div class='sidecontainer'>
    <div class='userbar'>
     <img class="profilepic" v-if='user.sub' :src='user.picture'/>
    Hey, {{user.given_name}}
    </div>
    <div class='lists'>
        <p>Inbox</p>
        <p>Buy</p>
        <p>Marketing</p>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data(){
        return {
            list: ''
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
    background-color: #E2E2E2;
    height: 7vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
div.lists {
    margin-top: 15px;
}

@keyframes slidein {
  from {margin-left: -30vw; opacity: 0}
  to {margin-left: -3vw; opacity: 1}
}

</style>