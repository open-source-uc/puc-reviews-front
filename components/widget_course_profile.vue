<template>
  <v-card
  :loading="course.length == 0"
  class="mx-auto"
  :width="width"
  scrollable>
        <v-card-title class="headline grey lighten-2 mb-2">
          {{ course.name }}
          <v-btn class="ml-auto"
          @click="closeAndCleanUpEntity">
            <v-icon >mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row >
        <!-- COLUMNA Atributos -->
            <v-col>
              <h5 v-if="!$vuetify.breakpoint.xs">Detalles</h5>
              <h6 v-else>Detalles</h6>
              <v-divider></v-divider>
              <v-row>
                 <h6><v-icon>mdi-star</v-icon> {{ course.global_rating }} ({{course.rating_counts.total}} totales)</h6>
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

            <v-col>
              <v-navigation-drawer
              permanent
              right>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      Reseñas
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      filtrar
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list
                  dense
                  nav
                >
                  <v-list-item
                    @click="resetFilteredReviews"
                    :disabled='course.rating_counts.total <= 0'
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>Todo ({{course.rating_counts.total}})</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item
                    v-for="item in $store.state.ratingIntervals"
                    :key="item.name"
                    @click="retrieveReviews(item.value.min, item.value.max)"
                    :disabled='course.rating_counts[item.name] <= 0'
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }} ({{course.rating_counts[item.name]}})</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <!-- FILA REVIEWS -->
          <v-row>
            <v-col>
              <widget_review_list :reviews="course_reviews" :requested='infoRequested' :hasTitle='false'
                v-if="!filteredReviews.length > 0"></widget_review_list>
                <widget_review_list :reviews="filteredReviews" :requested='infoRequested' :hasTitle='false'
                v-else></widget_review_list>
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
      closeAndCleanUpEntity() {
        this.$store.commit('changeEntityInfo', [])
        this.$store.commit('changeEntityReviews', [])
        this.$store.commit('changeRequestedEntityInfo', false)
        this.$store.commit('changeCurrentEntityType', null)
        this.$store.commit('closeProfile')
      },
      async retrieveReviews(min, max) {
        const response = await this.$axios.get(`/api/v1//course/reviews`, {
          params: {
            course_id: this.course.id,
            min: min,
            max: max,
          }
        })
        const items = response.data
        this.filteredReviews = items
      },
      resetFilteredReviews() {
        this.filteredReviews = []
      }
    },
  data() {
    return {
      filteredReviews: [],
      coursesFields: [
          {
            key: 'name',
            label: 'Nombre Profesor',
            sortable: true,
          },
      ]
    }
  }
}
</script>

<style>

</style>