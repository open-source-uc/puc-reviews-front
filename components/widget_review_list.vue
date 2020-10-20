<template>
  <v-app>
    <h4 v-if="hasTitle">{{ title }}</h4>
    <v-row>
    <template v-if="reviews.length > 0">
      <template v-for="review in reviews">
        <v-col :key="review.id" :cols="$vuetify.breakpoint.mobile ? null : '6'">
        <review_card :review=review :key="review.id" class="mt-3"></review_card>
        </v-col>
      </template>
    </template>
    <v-progress-circular
      indeterminate
      color="primary"
      class="mx-auto"
      v-else-if="!requested"
    ></v-progress-circular>
    <h6 v-else class="mx-auto">Nada para mostrar</h6>
    </v-row>
  </v-app>
</template>

<script>
import review_card from "@/components/review_card.vue"
export default {
  components: {
    review_card,
  },
  props:{
    hasTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "Reseñas"
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
  }
}
</script>

<style>

</style>