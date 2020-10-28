<template>
  <v-app>
    <navbar></navbar>
    <v-card :loading='$store.state.loader'>
    <Nuxt />
    </v-card>
    <Snackbar></Snackbar>
    <toTop></toTop>
    <absolute_footer></absolute_footer>
  </v-app>
</template>

<script>
import navbar from "@/components/navbar.vue"
import axios from 'axios'
import Snackbar from '~/components/Snackbar.vue'
import absolute_footer from "~/components/absolute_footer.vue"
import toTop from "~/components/toTop.vue"
export default {
  components: {
    navbar,
    Snackbar,
    absolute_footer,
    toTop
  },
  data: function(){
    return{
    }
  }
}
</script>

<style>
#app {
    overflow: auto;
}
</style>