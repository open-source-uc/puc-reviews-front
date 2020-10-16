<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/"><v-icon>mdi-star</v-icon>PUC</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/teachers"><v-icon>mdi-human-greeting</v-icon>Profesores</b-nav-item>
          <b-nav-item to="/courses"><v-icon>mdi-pencil</v-icon>Ramos</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <!-- IF LOGGED IN  -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <v-autocomplete
                  v-model="entity"
                  solo
                  flat
                  hide-details
                  :search-input.sync="search_params"
                  no-data-text="Sin entradas..."
                  :items="search_items"
                  item-value="info"
                  item-text="name"
                  label="Buscar"
                  @change="getEntityInfo(entity.id, entity.type)"
                  @keydown="getItems(search_params)">
                </v-autocomplete>
                <b-button class="ml-2"
                @click="showInfo = true" :disabled="entityInfo.length == 0"><v-icon>mdi-magnify</v-icon></b-button>
            </b-nav-form>
            <template v-if="$auth.loggedIn">
            <b-nav-item>
              <button class="btn btn-success" @click="$store.commit('openReviewsForm')">
                <v-icon dark>mdi-plus</v-icon> Reseña
              </button>
            </b-nav-item>

            <b-nav-item-dropdown :text="$auth.user.name" right>
            <!-- Using 'button-content' slot -->
            <!-- <b-dropdown-item href="#">Perfil</b-dropdown-item> -->
            <b-dropdown-item @click="logOut()">Cerrar Sesión</b-dropdown-item>
            </b-nav-item-dropdown>
            </template>
          <!-- IF NOT LOGGED IN  -->
            <template v-else>
              <b-nav-item><NuxtLink to="/sign_up"><button class="btn btn-success">Registrarse</button></NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/"><button class="btn btn-primary">Iniciar Sesión</button></NuxtLink></b-nav-item>
            </template>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <v-dialog
      v-model="$store.state.showReviewForm"
      width="500"
      @click:outside="$store.commit('closeReviewsForm')"
    >
      <new_review_form></new_review_form>
    </v-dialog>
    <v-dialog
      v-model="showInfo"
      width="800"
    >
      <widget_teacher_profile v-if="entity.type == 'teacher'" :teacher="entityInfo" :teacher_reviews="entity_reviews"></widget_teacher_profile>
      <widget_course_profile v-else :course="entityInfo" :course_reviews="entity_reviews"></widget_course_profile>

    </v-dialog>
  </div>
</template>

<script>
import new_review_form from "@/components/new_review_form.vue"
import widget_teacher_profile from "@/components/widget_teacher_profile.vue"
import widget_course_profile from "@/components/widget_course_profile.vue"



export default {
  components: {
    new_review_form,
    widget_teacher_profile,
    widget_course_profile
  },
  data: function(){
    return {
      entity: {},
      search_params: null,
      search_items: [],
      showInfo: false,
      entityInfo: [],
      entity_reviews: []
    }
  },
  methods: {
    async logOut(){
      await this.$auth.logout()
      this.$notifier.showMessage({ content: 'Sesión Cerrada', color: 'info' })
    },
    async getItems(search_params) {
        const Response = await this.$axios.get(`/api/v1/search?name=${search_params}`)
        this.search_items = Response.data
      },
    async getEntityInfo(id, type) {
      let path = undefined
      if (type == 'teacher') {
        path = 'teachers'
      } else {
        path = 'courses'
      }
      if (path != undefined){
        const Response = await this.$axios.get(`/api/v1/${path}/${id}`)
        this.entityInfo = Response.data
        if (type == 'teacher') {
          const ReviewsResponse = await this.$axios.get(`/api/v1/teacher_reviews/teacher/${id}`)
          this.entity_reviews = ReviewsResponse.data
        } else {
          const ReviewsResponse = await this.$axios.get(`/api/v1/course_reviews/course/${id}`)
          this.entity_reviews = ReviewsResponse.data
        }
      }
    },
  },

}
</script>

<style>

</style>