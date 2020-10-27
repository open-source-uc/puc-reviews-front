<template>
  <v-card
  :loading="teacher.length == 0"
  class="mx-auto"
  :width="width"
  scrollable>
        <v-card-title class="headline grey lighten-2 mb-2">
          {{ teacher.name }}
          <v-btn class="ml-auto"
            @click="closeAndCleanUpEntity">
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
                 <h6><v-icon>mdi-star</v-icon> {{ teacher.global_rating }} ({{teacher.rating_counts.total}} totales)</h6>
              </v-row>
              <v-row>
                 <h6><v-icon>mdi-email</v-icon> {{ teacher.email }}</h6>
              </v-row>
              <v-row>
                 <h6><v-icon>mdi-notebook</v-icon> Ramos</h6>
                <b-table
                :items="teacher.courses"
                :fields="coursesFields"
                show-empty
                responsive
                ref="table"
                id="courses-table">
                <template v-slot:cell(show_profile)="row">
                  <b-button size="sm" @click="openProfile(row.item.id)" class="mr-2" variant="primary">
                    Mostrar
                  </b-button>
                </template>

                <template v-slot:empty>
                  <center><h5>No se encontraron profesores.</h5></center>
                </template>
                </b-table>
                <b-pagination
                  class="mx-auto"
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="courses-table"
                  ></b-pagination>
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
                    :disabled='teacher.rating_counts.total <= 0'
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>Todo ({{teacher.rating_counts.total}})</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item
                    v-for="item in $store.state.ratingIntervals"
                    :key="item.name"
                    @click="retrieveReviews(item.value.min, item.value.max)"
                    :disabled='teacher.rating_counts[item.name] <= 0'
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.name }} ({{teacher.rating_counts[item.name]}})</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-col>
          </v-row>
          <!-- FILA REVIEWS -->
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <widget_review_list :reviews="teacher_reviews" :requested='infoRequested' :hasTitle='false'
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
  computed: {
      rows() {
        return this.teacher.courses.length
      }
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
    closeAndCleanUpEntity() {
        this.$store.commit('changeEntityInfo', [])
        this.$store.commit('changeEntityReviews', [])
        this.$store.commit('changeRequestedEntityInfo', false)
        this.$store.commit('changeCurrentEntityType', null)
        this.$store.commit('closeProfile')
      },
      async retrieveReviews(min, max) {
        const response = await this.$axios.get(`/api/v1//teacher/reviews`, {
          params: {
            teacher_id: this.teacher.id,
            min: min,
            max: max,
          }
        })
        const items = response.data
        this.filteredReviews = items
      },
      resetFilteredReviews() {
        this.filteredReviews = []
      },
      async getCourseInfo(id) {
          this.$store.commit('changeRequestedEntityInfo', false);

          this.$store.commit('changeCurrentEntityType', 'course')
          const courseResponse = await this.$axios.get(`/api/v1/courses/${id}/`)
          this.$store.commit('changeEntityInfo', courseResponse.data);

          const reviewsResponse = await this.$axios.get(`/api/v1/course_reviews/course/${id}/`)
          this.$store.commit('changeEntityReviews', reviewsResponse.data);

          this.$store.commit('changeRequestedEntityInfo', true);
      },
      async openProfile(new_id) {
        this.$store.commit('changeLoaderState', true);
        await this.getCourseInfo(new_id);
        this.$store.commit('openProfile');
        this.$store.commit('changeLoaderState', false);
      },
    },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      filteredReviews: [],
      coursesFields: [
          {
            key: 'acronym',
            label: 'SIG',
            sortable: true,
          },
          {
            key: 'name',
            label: 'Nombre ramo',
            sortable: true,
          },
          {
            key: 'show_profile',
            label: 'Perfil',
            sortable: true,
          },
      ]
    }
  }
}
</script>

<style>

</style>