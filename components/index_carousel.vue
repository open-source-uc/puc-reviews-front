<template>
  <v-carousel
    :height="defineCarouselWidth()"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
    class="pa-6">
      <v-sheet
        color="teal lighten-2"
        height="100%"
      >
        <v-row
          class="pa-6 mx-auto"
          align="center"
          justify="center"
        >
        <h6 class="display-2">¡Bienvenido!</h6>
        </v-row>
        <v-row
        align="center"
        justify="center"
        class="pa-6 mx-auto">
          <center><h6 class="headline">Guía tu proxima toma de ramos!</h6></center>
        </v-row>
        <v-divider></v-divider>
        <v-row class="pa-6"
          align="center"
          justify="center"
          v-if="!$auth.loggedIn">
          <center><h6 class="mt-2">Para partir, inicia sesión para poder crear reseñas!</h6></center>
         <b-button class="ml-6" variant="dark" @click="$router.push('/sign_up')">Registrarse</b-button>
         <b-button class="ml-6" variant="primary" @click="$router.push('/login')">Iniciar Sesión</b-button>
        </v-row>

        <template v-else>
          <template v-if="$vuetify.breakpoint.width > 800">
            <v-row class="px-6 mx-6">
              <center><h6 class="mt-2">Sugiere un nombre!</h6></center>
            </v-row>

            <v-row class="pb-6 mx-6">
              <v-col cols="8">
                <v-text-field v-model="proposedName"
                background-color="white"
                autofocus
                outlined
                solo-inverted
                dense
                placeholder="¿Que otro nombre le pondrías a esta plafaroma?"></v-text-field>
              </v-col>
              <v-col cols="4"
              class="ml-0">
                <b-button
                :disabled="proposedName == ''"
                variant="primary"
                fab
                :href="proposedNameUrl()"
                target="_blank"><v-icon>mdi-share</v-icon></b-button>
              </v-col>
            </v-row>
          </template>

          <template v-else>
            <v-row class="px-6 mx-6">
              <center><h6 class="mt-2">Sugiere un nuevo nombre para esta plataforma!</h6></center>
            </v-row>

            <v-row class="mx-2">
              <v-col >
                <v-text-field v-model="proposedName"
                background-color="white"
                autofocus
                outlined
                solo-inverted
                dense
                ></v-text-field>
              </v-col>
              <b-button
              :disabled="proposedName == ''"
              block
              variant="primary"
              class="mx-3"
                :href="proposedNameUrl()"
                target="_blank">
                <v-icon dark >
                  mdi-share
                </v-icon> </b-button>
            </v-row>
          </template>
        </template>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
    class="pa-6">
      <v-sheet
        color='grey darken-2'
        height="100%"
      >
        <v-row
          class="pa-6 mx-auto"
          align="center"
          justify="center"
        >
          <v-col class="pa-6" align="center">
            <v-row>
              <h6 class="display-1 mx-auto pb-6" >¡Compartenos!</h6>
            </v-row>
            <v-row>
              <h6 class="body-1">Comparte la plataforma con más estudiantes para poder seguir creciendo.</h6>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  fab
                  dark
                  color="teal"
                  :href="whatsappUrl"
                  target="_blank"
                >
                  <v-icon dark>
                    mdi-whatsapp
                  </v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  color="blue"
                  :href="facebookUrl"
                  target="_blank"
                >
                  <v-icon dark>
                    mdi-facebook
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-divider vertical v-if="!$vuetify.breakpoint.mobile"></v-divider>
          <v-col class="pa-6" align="center">
            <v-row>
              <h6 class="display-1 mx-auto pb-6">¡Colabora!</h6>
            </v-row>
            <v-row>
              <h6 class="body-1">¿Te interesaría ayudar a desarrollar esta plataforma?</h6>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  fab
                  dark
                  color="light-blue accent-4"
                  :href="emailUrl" target="_blank"
                >
                  <v-icon dark>
                    mdi-email
                  </v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  color="dark"
                  :href="githubUrl" target="_blank"
                >
                  <v-icon dark>
                    mdi-github
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row align="center" >
              <h6 class="body-1 mx-auto">Explora el proyecto!</h6>
            </v-row>
          </v-col>
        </v-row>

      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>

export default {

  data: function(){
    return{
      proposedName: "",
      githubUrl: 'https://github.com/puc-reviews',
      whatsappUrl: `https://wa.me/?text=Mira%20esta%20página!%20${window.location.origin}`,
      facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}`,
      emailUrl: 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=aenrione@uc.cl&su=Reseñas PUC',
    }
  },
  methods: {
    defineCarouselWidth() {
      if (this.$vuetify.breakpoint.width > 800) {
        return '425'
      } else if (this.$vuetify.breakpoint.width <= 800 && 600 < this.$vuetify.breakpoint.width) {
        return '600'
      } else {
        return '650'
      }
    },
    proposedNameUrl() {
      return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=aenrione@uc.cl&su=Nombre Reseñas PUC&body=${this.proposedName}`
    }
  }
}
</script>

<style>

</style>