<template>
  <v-card id="index"
  :style="$vuetify.breakpoint.mobile ? '' : 'margin-left: 20%;margin-right: 20%; maxi-width: 960px'">
    <v-container>
    <search_bar></search_bar>
    <v-row>
      <v-col>
        <index_carousel></index_carousel>
      </v-col>
    </v-row>
    <b-button block variant="info" @click="$router.push('/teachers')"><v-icon dark class="mr-2">mdi-account-tie</v-icon>Encuentra tus profesores!</b-button>

    <b-button block variant="dark" @click="$router.push('/courses')"><v-icon dark class="mr-2">mdi-notebook</v-icon>Encuentra tus ramos!</b-button>

    <v-divider></v-divider>
    <v-row>
      <v-col>
        <best_teachers_mobile_list :teachers='best_teachers' :requested='bestTeachersRequested'></best_teachers_mobile_list>
      </v-col>
    </v-row>
    <v-row v-if="$vuetify.breakpoint.width > 500">
      <v-col>
        <latest_reviews_list :reviews='$store.state.latestReviews' :requested='$store.state.lastReviewsRequested'></latest_reviews_list>
      </v-col>
    </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>

<script>
import widget_review_list from "@/components/widget_review_list.vue"
import search_bar from "@/components/search_bar.vue"
import index_carousel from "@/components/index_carousel.vue"
import best_teachers_mobile_list from "@/components/best_teachers_list.vue"
import latest_reviews_list from "@/components/latest_reviews_list.vue"

export default {
  mounted() {
    this.getIndexItems()
  },
  components: {
    widget_review_list,
    best_teachers_mobile_list,
    index_carousel,
    search_bar,
    latest_reviews_list
  },
  data: function () {
    return {
      lastReviewsRequested: false,
      bestTeachersRequested: false,
      best_teachers: [],
      last_reviews: [],

    }
  },
  methods: {
    async getLatestReviews(n) {
        this.$store.commit('changeRequestedLatestReviews', false)
        const response = await this.$axios.get(`/api/v1/latest_reviews?n=${n}`)
        const items = response.data
        this.$store.commit('changeLatestReviews', items)
        this.lastReviewsRequested = true
        this.$store.commit('changeRequestedLatestReviews', true)
      },
    async getBestTeachers() {
        this.bestTeachersRequested = false
        const response = await this.$axios.get(`/api/v1/best_teachers`)
        const items = response.data
        this.best_teachers = items
        this.bestTeachersRequested = true
      },
    getIndexItems(){
      this.getBestTeachers()
      if (this.$vuetify.breakpoint.width > 500) {
        this.getLatestReviews(10)
      }
    }
  }
}
</script>

