<template>
  <v-card
  :loading="teacher.length == 0"
  class="mx-auto"
  :width="width"
  scrollable>
        <v-card-title class="headline grey lighten-2 mb-2">
          {{ teacher.name }}
          <v-btn class="ml-auto"
            @click="$store.commit('closeProfile')">
              <v-icon >mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row >
        <!-- COLUMNA Atributos -->
            <v-col
            >
              <h5 v-if="!$vuetify.breakpoint.xs">Detalles</h5>
              <h6 v-else>Detalles</h6>
              <v-divider></v-divider>
              <v-row>
                 <h6><v-icon>mdi-star</v-icon> {{ teacher.global_rating }}</h6>
              </v-row>
              <v-row>
                 <h6><v-icon>mdi-email</v-icon> {{ teacher.email }}</h6>
              </v-row>
              <v-row>
                 <h6><v-icon>mdi-notebook</v-icon> Ramos</h6>
                <b-table
                :items="teacher.courses"
                :fields="coursesFields">
                </b-table>
              </v-row>
            </v-col>
        <!-- FILA REVIEWS -->
          </v-row>

          <v-row>
            <widget_review_list :reviews="teacher_reviews" :requested='infoRequested'></widget_review_list>
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
    teacher: {
      type: Object,
      default() {
        return {}
      }
    },
    teacher_reviews: {
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