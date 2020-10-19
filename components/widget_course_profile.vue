<template>
  <v-card
  :loading="course.length == 0"
  class="mx-auto"
  :width="width"
  scrollable>
        <v-card-title class="headline grey lighten-2 mb-2">
          {{ course.name }}
        </v-card-title>

        <v-card-text>
          <v-row >
        <!-- COLUMNA Atributos -->
            <v-col>
              <h5 v-if="!$vuetify.breakpoint.xs">Detalles</h5>
              <h6 v-else>Detalles</h6>
              <v-divider></v-divider>
              <v-row>
                 <h6><v-icon>mdi-star</v-icon> {{ course.global_rating }}</h6>
              </v-row>
              <v-row>
                 <h6 v-if="course.school"><v-icon>mdi-school</v-icon> {{ course.school.name }}</h6>
              </v-row>
              <v-row>
                 <h6><v-icon>mdi-human-greeting</v-icon> Profesores</h6>
                <b-table
                :items="course.teachers"
                :fields="coursesFields">
                </b-table>
              </v-row>
            </v-col>
          </v-row>
          <!-- FILA REVIEWS -->
          <v-row>
            <v-col>
              <widget_review_list :reviews="course_reviews" :requested='infoRequested'></widget_review_list>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
</template>

<script>
import widget_review_list from "@/components/widget_review_list.vue"

export default {
  components: {
    widget_review_list
  },
  props: {
    infoRequested: {
      type: Boolean,
      default: false
    },
    course: {
      type: Object,
      default() {
        return {}
      }
    },
    course_reviews: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: String,
      default: "800"
    }
  },
  methods: {

    },
  data() {
    return {
      coursesFields: [
          {
            key: 'name',
            label: 'Nombre',
            sortable: true,
          },
      ]
    }
  }
}
</script>

<style>

</style>