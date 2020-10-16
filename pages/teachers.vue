<template>
  <v-app>
    <h3 class="mx-auto mt-6">Profesores</h3>
    <v-card
    class="mx-auto mt-6"
    width="1000">
      <b-table
      ref="table"
      striped
      :items="getTeachers"
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
        <center><h5>No se encontraron profesores.</h5></center>
      </template>
    </b-table>
    </v-card>
    <v-dialog
    v-model="showProfile"
    width="800">
      <widget_teacher_profile :teacher="teacher" :teacher_reviews="teacher_reviews"></widget_teacher_profile>
    </v-dialog>
  </v-app>
</template>

<script>
import widget_teacher_profile from "@/components/widget_teacher_profile.vue"

export default {
  data: function(){
    return{
      showProfile: false,
      teacher: {},
      teacher_reviews: [],
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
  components: {
    widget_teacher_profile
  },
  methods: {
      getTeachers() {
        const promise = this.$axios.get(`/api/v1/teachers`)
        return promise.then(response => {
          const items = response.data
          return items || []
        })
      },
      async getTeacherInfo(id) {
          const teacherResponse = await this.$axios.get(`/api/v1/teachers/${id}/`)
          this.teacher = teacherResponse.data
          const reviewsResponse = await this.$axios.get(`/api/v1/teacher_reviews/teacher/${id}/`)
          this.teacher_reviews = reviewsResponse.data

      },
      async openProfile(new_id) {
        this.getTeacherInfo(new_id);
        this.showProfile = true
      }
    },
}
</script>

<style>

</style>
