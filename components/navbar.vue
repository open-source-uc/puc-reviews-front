<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand><NuxtLink to="/"><v-icon>mdi-star</v-icon></NuxtLink></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><NuxtLink to="/teacher_reviews">Reseñas Profes</NuxtLink></b-nav-item>
          <b-nav-item><NuxtLink to="/course_reviews">Reseñas Ramos</NuxtLink></b-nav-item>
            <b-nav-item-dropdown text="Explorar">
              <b-dropdown-item><NuxtLink to="/teachers">Profesores</NuxtLink></b-dropdown-item>
              <b-dropdown-item><NuxtLink to="/courses">Cursos</NuxtLink></b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="$auth.loggedIn" class="ml-auto">
            <b-nav-item>
              <button class="btn btn-success">
                <v-icon dark>mdi-plus</v-icon> Reseña
              </button>
            </b-nav-item>

            <b-nav-item-dropdown :text="$auth.user.name" right>
            <!-- Using 'button-content' slot -->
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item @click="logOut()">Cerrar Sesión</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav v-else class="ml-auto">
            <b-nav-item><NuxtLink to="/sign_up"><button class="btn btn-success">Registrarse</button></NuxtLink></b-nav-item>
            <b-nav-item><NuxtLink to="/"><button class="btn btn-primary">Iniciar Sesión</button></NuxtLink></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import new_review_form from "@/components/new_review_form.vue"
export default {
  components: {
    new_review_form
  },
  props: {
		user: {
			type: Object,
			required: false,
			default: () => ({ name: "Nombre de Usuario" }),
		},
	},
  data: function(){
    return{
    }
  },
  methods: {
    logOut(){
      this.$auth.logout()
      this.$notifier.showMessage({ content: 'Sesión Cerrada', color: 'info' })
    }
  }
}
</script>

<style>

</style>