<template>
  <v-card
  class="pa-2"
  style="text-align: center;"
  :max-width="$vuetify.breakpoint.width">

  <v-chip
    class="mx-auto ml-6"
    color="cyan darken-2"
    outlined
  >
    <v-icon left>
      mdi-star
    </v-icon>
    {{title}}
  </v-chip>
  <v-container>
    <v-row v-if="!requested">
      <v-progress-circular
        class="mx-auto"
          indeterminate
          color="primary"
        ></v-progress-circular>
    </v-row>
    <v-row v-else-if="reviews.length != 0" dense
    style="text-align: left;">
      <v-carousel
      height="500"
      cycle
      >
      <v-sheet
        color="cyan lighten-2">
        <v-carousel-item
        v-for="(review, i) in reviews"
        :key="i">
          <review_card :review=review class="mt-6" :index='true' color='grey darken-4'></review_card>
        </v-carousel-item>
        </v-sheet>
      </v-carousel>
    </v-row>

    <v-row v-else>
      <v-col>
       <h6>Sin reseñas todavia <v-icon>mdi-emoticon-sad-outline</v-icon></h6><br>
       <h6>Inicie Sesión y agregue alguna!</h6>
      </v-col>
    </v-row>
  </v-container>
  </v-card>
</template>

<script>
import review_card from "@/components/review_card.vue"

export default {
  components: {
    review_card
  },
  props:{
    title: {
      type: String,
      default: "Últimas Reseñas"
    },
    reviews: {
      type: Array,
      default() {
        return []
      }
    },
    requested: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({}),
  methods: {
    
  }
}
</script>

<style>

</style>