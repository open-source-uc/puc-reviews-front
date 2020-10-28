<template>
  <v-footer
      absolute
      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <v-btn icon
        :href="`https://wa.me/?text=Mira%20esta%20página!%20${baseUrl}`"><v-icon color="black" target="_blank">mdi-whatsapp</v-icon></v-btn>
        <v-btn icon
        :href="`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}`" target="_blank"><v-icon color="black">mdi-facebook</v-icon></v-btn>
      </v-col>
    </v-footer>
</template>

<script>
export default {
  data: function(){
    return{
      baseUrl: window.location.origin
    }
  }

}
</script>

<style>

</style>