<template>
  <v-app>
    <navbar></navbar>
    <v-card :loading='$store.state.loader'>
    <Nuxt />
    </v-card>
    <Snackbar></Snackbar>
    <toTop></toTop>
		<mainFooter></mainFooter>
  </v-app>
</template>

<script>
import navbar from "@/components/navbar.vue"
import axios from 'axios'
import Snackbar from '~/components/Snackbar.vue'
import toTop from "~/components/toTop.vue"
import mainFooter from "@/components/footer.vue"


export default {
  components: {
    navbar,
    Snackbar,
    toTop,
		mainFooter
  },
  data: function(){
    return{
    }
  }
}
</script>

<style>

</style>