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
        :href="`https://wa.me/?text=Checkout%20this%20page.%20${baseUrl}`"><v-icon color="black">mdi-whatsapp</v-icon></v-btn>
        <v-btn icon
        :href="`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}`" target="_blank"><v-icon color="black">mdi-facebook</v-icon></v-btn>
      </v-col>
    </v-footer>
</template>

<script>
export default {
  data: function(){
    return{
      baseUrl: process.env.baseUrl
    }
  }

}
</script>

<style>

</style>