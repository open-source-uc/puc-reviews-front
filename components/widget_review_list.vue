<template>
  <v-app>
    <h4>{{ title }}</h4>
    <template v-if="reviews.length > 0">
      <template v-for="review in reviews">
        <review_card :review=review :key="review.id" class="mt-3"></review_card>
      </template>
    </template>
    <v-progress-circular
      indeterminate
      color="primary"
      class="mx-auto"
      v-else-if="!requested"
    ></v-progress-circular>
    <h6 v-else class="mx-auto">Nada para mostrar</h6>
  </v-app>
</template>

<script>
import review_card from "@/components/review_card.vue"
export default {
  components: {
    review_card,
  },
  props:{
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