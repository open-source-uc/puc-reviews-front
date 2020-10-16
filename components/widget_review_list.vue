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
      v-else
    ></v-progress-circular>
    <!-- <h6 v-else>Nada para mostrar</h6> -->
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
      // default: [
      //     {
      //     id: 2,
      //     user: {
      //       id: 0,
      //       name: "Person"
      //     },
      //     type: 'teacher',
      //     teacher: {
      //       name: "Nombre Profesor"
      //     },
      //     course: {
      //       name: "Nombre Ramo"
      //     },
      //     rating: 6,
      //     general_comment: "Me gustó"
      //   },
      //   {
      //     id: 3,
      //     user: {
      //       id: 0,
      //       name: "Person"
      //     },
      //     type: 'teacher',
      //     teacher: {
      //       name: "Nombre Profesor"
      //     },
      //     course: {
      //       name: "Nombre Ramo"
      //     },
      //     rating: 6,
      //     general_comment: "Me gustó"
      //   },
      // ]
    },
  }
}
</script>

<style>

</style>