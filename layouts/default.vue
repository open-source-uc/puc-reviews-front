<template>
  <v-app>
    <navbar></navbar>
    <v-card :loading='$store.state.loader'>
    <Nuxt />
    </v-card>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import navbar from "@/components/navbar.vue"
import axios from 'axios'
import Snackbar from '~/components/Snackbar.vue'
export default {
  components: {
    navbar,
    Snackbar
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