<template>
  <v-app>
    <navbar></navbar>
    <Nuxt />
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import navbar from "@/components/navbar.vue"
import new_review_form from "@/components/new_review_form.vue"
import axios from 'axios'
import Snackbar from '~/components/Snackbar.vue'
export default {
  components: {
    navbar,
    new_review_form,
    Snackbar
  },
  data: function(){
    return{
    }
  }
}
</script>

<style>

</style>