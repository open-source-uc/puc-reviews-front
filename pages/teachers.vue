<template>
  <v-app>
    <h3 class="mx-auto mt-6">Profesores</h3>
    <v-card
    class="mx-auto mt-6"
    width="1000">
    <v-row class="ml-2">
        <v-col><h4>Filtros</h4>
        <v-btn class="mr-4" color="primary"
          @click="showFilters = !showFilters">
          <v-icon v-if="showFilters">mdi-arrow-down-circle </v-icon>
          <v-icon v-else>mdi-arrow-right-circle </v-icon>
          </v-btn></v-col>
        <v-col>
          <v-btn class="mr-4" color="primary"
          @click="updateTeachers">
          Aplicar Filtro<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
    </v-row>
    <template v-if="showFilters">
    <v-row class="pa-6">
      <v-col>
        <h6>Nombre</h6>
        <v-text-field
          clearable
          v-model="searchParams.teacher_name"
          placeholder="nombre"
        ></v-text-field>
      </v-col>
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
    </v-row>

    <v-row class="px-6">
      <v-col>
        <h6>Escuela</h6>
        <v-autocomplete
        :disabled="(searchParams.faculty_id != undefined) || (searchParams.course_id != undefined)"
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
        <h6>Facultdad</h6>
        <v-autocomplete
        :disabled="(searchParams.course_id != undefined) || (searchParams.school_id != undefined)"
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
          id="teachers-table"
          striped
          :items="autoCompleteItems.teachers"
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
            <center><h5>No se encontraron profesores.</h5></center>
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
        aria-controls="teachers-table"
      ></b-pagination>
    </v-row>

    </v-card>
  </v-app>
</template>

<script>
import widget_teacher_profile from "@/components/widget_teacher_profile.vue"

export default {
  async created() {
    await this.getAutoCompleteItems()
  },
  computed: {
      rows() {
        return this.autoCompleteItems.teachers.length
      }
  },
  data: function(){
    return{
      indexRequested: false,
      showFilters: false,
      requestedTeacherInfo: false,
      searchParams: {
        teacher_name: undefined,
        school_id: undefined,
        faculty_id: undefined,
        rating: {}
      },
      perPage: 7,
      currentPage: 1,
      autoCompleteItems: {
        schools: [],
        faculties: [],
        teachers: [],
        teacher_reviews: [],
      },
      fields: [
          {
            key: 'global_rating',
            label: 'Nota',
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
    }
  },
  components: {
    widget_teacher_profile
  },
  methods: {
      async updateTeachers() {
        this.indexRequested = false
        this.$store.commit('changeLoaderState', true)
        if (this.searchParams.rating == undefined) {
          this.searchParams.rating = {}
        }
        const response = await this.$axios.get(`/api/v1/search_teachers`,
        {
          params: {
            teacher_name: this.searchParams.teacher_name,
            school_id: this.searchParams.school_id,
            faculty_id: this.searchParams.faculty_id,
            rating_max: this.searchParams.rating.max,
            rating_min: this.searchParams.rating.min,
          }
        })
        this.$store.commit('changeLoaderState', false)
        this.autoCompleteItems.teachers = response.data
        this.indexRequested = true
      },
      async getTeacherInfo(id) {
          this.$store.commit('changeRequestedEntityInfo', false);

          this.$store.commit('changeCurrentEntityType', 'teacher')
          const teacherResponse = await this.$axios.get(`/api/v1/teachers/${id}/`)
          this.$store.commit('changeEntityInfo', teacherResponse.data);

          const reviewsResponse = await this.$axios.get(`/api/v1/teacher_reviews/teacher/${id}/`)
          this.$store.commit('changeEntityReviews', reviewsResponse.data);

          this.$store.commit('changeRequestedEntityInfo', true);
      },
      async openProfile(new_id) {
        this.$store.commit('changeLoaderState', true);
        await this.getTeacherInfo(new_id);
        this.$store.commit('openProfile');
        this.$store.commit('changeLoaderState', false);
      },
      async getAutoCompleteItems() {
        // Teachers
        const teachersResponse = await this.$axios.get(`/api/v1/teachers`)
        this.autoCompleteItems.teachers = teachersResponse.data

        // Schools
        const schoolsResponse = await this.$axios.get(`/api/v1/schools`)
        this.autoCompleteItems.schools = schoolsResponse.data
        // Faculties
        const facultiesResponse = await this.$axios.get(`/api/v1/faculties`)
        this.autoCompleteItems.faculties = facultiesResponse.data

        this.indexRequested = true
      }
    },
}
</script>

<style>

</style>
