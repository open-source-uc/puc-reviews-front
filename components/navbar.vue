<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/"><v-icon color="white">mdi-star-circle </v-icon>INICIO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/teachers"><v-icon>mdi-human-greeting</v-icon>Busca Profesores</b-nav-item>
          <b-nav-item to="/courses"><v-icon>mdi-pencil</v-icon>Busca Ramos</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <!-- IF LOGGED IN  -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="$auth.loggedIn && $auth.user.role == 'super_admin'" to='/forms'>
              <button class="btn btn-primary" >
                <v-icon dark>mdi-plus-circle</v-icon> FORMS
              </button>
            </b-nav-item>

            <b-nav-form v-if="$route.name != 'index'">
              <v-autocomplete
                  style="width: 200px;"
                  v-model="entity"
                  solo
                  flat
                  dense
                  hide-details
                  :search-input.sync="search_params"
                  no-data-text="Sin entradas..."
                  :items="search_items"
                  item-value="info"
                  item-text="name"
                  label="Buscar"
                  clearable
                  @click:clear='closeAndCleanUpEntity'
                  @change="getEntityInfo"
                  @keydown="getItems(search_params)">
                </v-autocomplete>
                <b-button
                class="ml-2"
                v-if="Object.entries($store.state.currentEntityInfo).length == 0"
                size="sm"
                variant="secondary"
                @click="showInstructions"
                >
                  <v-icon size="30">mdi-account-search</v-icon>
                </b-button>
                <b-button
                  v-else
                  class="ml-2"
                  size="sm"
                  variant="primary"
                  @click="$store.commit('openProfile')">
                      <v-icon size="30">mdi-account-check</v-icon>
                </b-button>
            </b-nav-form>


            <template v-if="$auth.loggedIn">
            <b-nav-item>
              <button class="btn btn-success" @click="$store.commit('openReviewsForm')">
                <v-icon dark>mdi-plus-circle</v-icon>Añade una reseña
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
              <!-- <b-nav-item><NuxtLink to="/sign_up"><button class="btn btn-success">Registrarse</button></NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/login"><button class="btn btn-primary">Iniciar Sesión</button></NuxtLink></b-nav-item> -->
              <b-nav-item>
                <b-button
                class="ml-6"
                variant="danger"
                @click="$auth.loginWith('google')">
                <v-icon>mdi-google</v-icon> Iniciar Sesión con mail UC
                </b-button>
              </b-nav-item>
            </template>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <v-dialog
      max-width="600"
      :fullscreen="$vuetify.breakpoint.mobile"
      v-model="$store.state.showReviewForm"
      :width="$vuetify.breakpoint.width"
      @click:outside="$store.commit('closeReviewsForm')"
    >
      <new_review_form :width='$vuetify.breakpoint.width'></new_review_form>
    </v-dialog>

    <v-dialog
      v-model="$store.state.showProfile"
      @click:outside="closeAndCleanUpEntity"
      width="800"
    >
    <template v-if="Object.entries($store.state.currentEntityInfo).length > 0">
      <widget_teacher_profile v-if="$store.state.currentEntityType == 'teacher'" :teacher="$store.state.currentEntityInfo" :teacher_reviews="$store.state.currentEntityReviews" :infoRequested='$store.state.requestedEntityInfo'></widget_teacher_profile>
      <widget_course_profile v-else :course="$store.state.currentEntityInfo" :course_reviews="$store.state.currentEntityReviews" :infoRequested='$store.state.requestedEntityInfo'></widget_course_profile>
    </template>
    </v-dialog>
  </div>
</template>

<script>
import new_review_form from "@/components/forms/new_review_form.vue"
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
    async getEntityInfo() {
      if (this.entity == undefined) {
          this.entity = { id: '', type: ''}
      }
      let id = this.entity.id
      let type = this.entity.type

      this.$store.commit('changeRequestedEntityInfo', false);
      let path = undefined
      if (type == 'teacher') {
        this.$store.commit('changeCurrentEntityType', type)
        path = 'teachers'
      } else if (type == 'course') {
        path = 'courses'
        this.$store.commit('changeCurrentEntityType', type)
      }
      if (path != undefined){
        const Response = await this.$axios.get(`/api/v1/${path}/${id}`)
        this.$store.commit('changeEntityInfo',Response.data)
        if (type == 'teacher') {
          const ReviewsResponse = await this.$axios.get(`/api/v1/teacher_reviews/teacher/${id}`)
          this.$store.commit('changeEntityReviews',ReviewsResponse.data)
        } else {
          const ReviewsResponse = await this.$axios.get(`/api/v1/course_reviews/course/${id}`)
          this.$store.commit('changeEntityReviews',ReviewsResponse.data)
        }
      this.$store.commit('changeRequestedEntityInfo', true);
      }
    },
    closeAndCleanUpEntity() {
        this.$store.commit('changeEntityInfo', [])
        this.$store.commit('changeEntityReviews', [])
        this.$store.commit('changeRequestedEntityInfo', false)
        this.$store.commit('changeCurrentEntityType', null)
        this.$store.commit('closeProfile')
      },
    showInstructions() {
      this.$notifier.showMessage({ content: 'Seleccione algo para ver su perfil', color: 'primary' })
    }
  },

}
</script>

<style>

</style>