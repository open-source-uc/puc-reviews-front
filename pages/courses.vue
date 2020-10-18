<template>
  <v-app>
      <h3 class="mx-auto mt-6">Ramos</h3>
      <v-card
      class="mx-auto mt-6 d-flex"
      width="1000">
        <b-table
        ref="table"
        striped
        :items="getCourses"
        :fields="fields"
        class="mb-0"
        no-provider-sorting
        show-empty
        responsive
        >
        <template v-slot:cell(show_profile)="row">
          <b-button size="sm" @click="openProfile(row.item.id)" class="mr-2" variant="primary">
          Mostrar
        </b-button>
        </template>

        <template v-slot:empty>
          <center><h5>No se encontraron ramos.</h5></center>
        </template>
      </b-table>
      </v-card>
      <v-dialog
      v-model="showProfile"
      width="800">
        <widget_course_profile :course="course" :course_reviews="course_reviews" :infoRequested='requestedCourseInfo'></widget_course_profile>
      </v-dialog>
  </v-app>
</template>

<script>
import widget_course_profile from "@/components/widget_course_profile.vue"

export default {
  components: {
    widget_course_profile
  },
  data() {
    return {
      requestedCourseInfo: false,
      showProfile: false,
      course: {},
      course_reviews: [],
      fields: [
          {
            key: 'name',
            label: 'Nombre',
            sortable: true,
          },
          {
            key: 'show_profile',
            label: 'Perfil'
          },
        ],
    }
  },
  methods: {
      getCourses() {
        const promise = this.$axios.get(`/api/v1/courses`)
        return promise.then(response => {
          const items = response.data
          return items || []
        })
      },
      async getCourseInfo(id) {
          this.requestedCourseInfo = false
          const courseResponse = await this.$axios.get(`/api/v1/courses/${id}/`)
          this.course = courseResponse.data
          const reviewsResponse = await this.$axios.get(`/api/v1/course_reviews/course/${id}/`)
          this.course_reviews = reviewsResponse.data
          this.requestedCourseInfo = true
      },
      async openProfile(new_id) {
        this.getCourseInfo(new_id);
        this.showProfile = true
      }
    },
}
</script>

<style>

</style>