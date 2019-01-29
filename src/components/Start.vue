<template>
  <div class="start">
    <h1>akt</h1>
    <button @click="login" type="button" class="btn btn-light">Login/Sign Up</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["bike"]),
  methods: {
    login() {
      let { VUE_APP_AUTH0_DOMAIN, VUE_APP_AUTH0_CLIENT_ID } = process.env;

      let url = `${encodeURIComponent(window.location.origin)}/auth/callback`;

      window.location = `https://${VUE_APP_AUTH0_DOMAIN}/authorize?client_id=${VUE_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`;
    }
  }
};
</script>

<style scoped>
div.start {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  color: white;
}
</style>