<template>
  <v-app id="index">
    <v-row>
      <v-col>
        <best_teachers_mobile_list :teachers='best_teachers' :requested='bestTeachersRequested'></best_teachers_mobile_list>
      </v-col>
    </v-row>
  </v-app>
</template>

<style scoped>
  #index {
    overflow: auto;
  }
</style>

<script>
import widget_review_list from "@/components/widget_review_list.vue"

import best_teachers_mobile_list from "@/components/best_teachers_list.vue"

export default {
  mounted() {
    this.getBestTeachers()
  },
  components: {
    widget_review_list,
    best_teachers_mobile_list
  },
  data: function () {
    return {
      lastReviewsRequested: false,
      bestTeachersRequested: false,
      best_teachers: [],
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
    async getBestTeachers() {
        const response = await this.$axios.get(`/api/v1/best_teachers`)
        const items = response.data
        this.best_teachers = items
        this.bestTeachersRequested = true
      },
  }
}
</script>

