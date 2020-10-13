<template>
  <v-app>
    <v-row>
      <v-col>
        <v-card
        class="mx-auto mt-6 text-align-center pa-6"
        max-width="600">
          <h2>Últimas Reseñas</h2>
          <last_reviews_card></last_reviews_card>
        </v-card>
      </v-col>
      <v-col>
        <sign_in_form v-if="!$auth.loggedIn"></sign_in_form>
        <v-card v-else
        class="mx-auto mt-6 text-align-center pa-6"
        max-width="600">
          <h2>Últimas Reseñas</h2>
          <last_reviews_card></last_reviews_card>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
</style>

<script>
import last_reviews_card from "@/components/last_reviews_card.vue"
import sign_in_form from "@/components/sign_in_form.vue"

export default {
  components: {
    last_reviews_card,
    sign_in_form,
  },
  data: function () {
    return {
    }
  }
}
</script>

