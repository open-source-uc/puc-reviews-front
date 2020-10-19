<template>
  <v-app>
    <v-row>
      <v-col v-if="!$auth.loggedIn">
        <sign_in_form ></sign_in_form>
      </v-col>
      <v-col>
        <v-card
        class="mx-auto mt-6 text-align-center pa-6"
        >
          <h2>Últimas Reseñas</h2>
          <widget_review_list title="" :reviews="last_reviews" :requested='lastReviewsRequested'></widget_review_list>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
</style>

<script>
import widget_review_list from "@/components/widget_review_list.vue"
import sign_in_form from "@/components/forms/sign_in_form.vue"

export default {
  mounted() {
    this.getLatestReviews(5)
  },
  components: {
    widget_review_list,
    sign_in_form,
  },
  data: function () {
    return {
      lastReviewsRequested: false,
      last_reviews: []
    }
  },
  methods: {
    async getLatestReviews(n) {
        const response = await this.$axios.get(`/api/v1/latest_reviews?n=${n}`)
        const items = response.data
        this.last_reviews = items
        this.lastReviewsRequested = true
      },
  }
}
</script>

