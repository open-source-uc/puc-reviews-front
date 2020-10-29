<template>
  <v-app>
    <h3 class="mx-auto mt-6">Ramos</h3>
    <v-card
    class="mx-auto mt-6"
    width="1000">
    <v-container>
    <v-row class="ml-2">
        <v-col><h4>Filtros</h4>
        <v-btn class="mr-4" color="primary"
          @click="showFilters = !showFilters">
          <v-icon v-if="showFilters">mdi-arrow-down-circle </v-icon>
          <v-icon v-else>mdi-arrow-right-circle </v-icon>
          </v-btn></v-col>
        <v-col>
          <v-btn class="mr-4" color="primary"
          @click="updateCourses">
          Aplicar Filtro<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
    </v-row>
    <template v-if="showFilters">
    <v-row class="pa-6">
      <v-col>
        <h6>Nota</h6>
        <v-autocomplete
        v-model="searchParams.rating"
        :items="$store.state.ratingIntervals"
        item-text="name"
        item-value="value"
        clearable>
        </v-autocomplete>
      </v-col>

      <v-col>
        <h6>Sigla</h6>
        <v-text-field
          clearable
          v-model="searchParams.acronym"
          placeholder="ejemplo: MAT1610"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="px-6">
      <v-col>
        <h6>Escuela</h6>
        <v-autocomplete
        :disabled="(searchParams.faculty_id != undefined)"
        v-model="searchParams.school_id"
        item-text="name"
        item-value="id"
        clearable
        solo
        flat
        hide-details
        no-data-text="Sin entradas..."
        :items="autoCompleteItems.schools"
        label="Nombre escuela">
        </v-autocomplete>
      </v-col>

      <v-col>
        <h6>Facultad</h6>
        <v-autocomplete
        :disabled="(searchParams.school_id != undefined)"
        v-model="searchParams.faculty_id"
        item-text="name"
        item-value="id"
        clearable
        solo
        flat
        hide-details
        no-data-text="Sin entradas..."
        :items="autoCompleteItems.faculties"
        label="Nombre facultad">
        </v-autocomplete>
      </v-col>
    </v-row>
    </template>

    <v-row>
      <v-col>
        <b-table
          :busy='!indexRequested'
          ref="table"
          id="courses-table"
          striped
          :items="autoCompleteItems.courses"
          :fields="fields"
          class="mb-0"
          no-provider-sorting
          show-empty
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          >
          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>
          <template v-slot:cell(show_profile)="row">
            <b-button size="sm" @click="openProfile(row.item.id)" class="mr-2" variant="primary">
              Mostrar
            </b-button>
          </template>

          <template v-slot:empty>
            <center><h5>Nada para mostrar.</h5></center>
            <center>Introduce campos para comenzar la busqueda</center>
          </template>
        </b-table>
      </v-col>
    </v-row>
    <v-row>
      <b-pagination
        class="mx-auto"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="courses-table"
      ></b-pagination>
    </v-row>
    </v-container>
    </v-card>
  </v-app>
</template>

<script>
import widget_course_profile from "@/components/widget_course_profile.vue"

export default {
  async created() {
    await this.getAutoCompleteItems()
  },
  computed: {
      rows() {
        return this.autoCompleteItems.courses.length
      }
  },
  components: {
    widget_course_profile
  },
  data() {
    return {
      indexRequested: false,
      requestedCourseInfo: false,
      showProfile: false,
      course: {},
      course_reviews: [],
      fields: [
          {
            key: 'global_rating',
            label: 'Nota',
            sortable: true,
          },
          {
            key: 'acronym',
            label: 'Sigla',
            sortable: true,
          },
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
      showFilters: true,
      searchParams: {
        school_id: undefined,
        faculty_id: undefined,
        rating: {},
        acronym: undefined
      },
      perPage: 7,
      currentPage: 1,
      autoCompleteItems: {
        courses: [],
        schools: [],
        faculties: []
      },
    }
  },
  methods: {
      async updateCourses() {
        this.indexRequested = false
        this.$store.commit('changeLoaderState', true)
        if (this.searchParams.rating == undefined) {
          this.searchParams.rating = {}
        }
        const response = await this.$axios.get(`/api/v1/search_courses`,
        {
          params: {
            school_id: this.searchParams.school_id,
            faculty_id: this.searchParams.faculty_id,
            rating_max: this.searchParams.rating.max,
            rating_min: this.searchParams.rating.min,
            acronym: this.searchParams.acronym
          }
        })
        this.$store.commit('changeLoaderState', false)
        this.autoCompleteItems.courses = response.data
        this.indexRequested = true
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
      async getAutoCompleteItems() {
        // Schools
        const schoolsResponse = await this.$axios.get(`/api/v1/schools`)
        this.autoCompleteItems.schools = schoolsResponse.data
        // Faculties
        const facultiesResponse = await this.$axios.get(`/api/v1/faculties`)
        this.autoCompleteItems.faculties = facultiesResponse.data

        this.indexRequested = true
      },
    },
}
</script>

<style>

</style>