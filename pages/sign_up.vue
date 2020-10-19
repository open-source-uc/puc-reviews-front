<template>
  <v-app  loading>
    <v-card
      class="mx-auto mt-6 pa-6"
      style="width: 50%;"
      max-width="800"
    >
      <h3 class="pt-2">Registro</h3>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="userInfo.name"
                :rules="requiredField"
                label="Nombre y Apellido"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="userInfo.student_number"
                :rules="requiredField"
                :counter="15"
                type="number"
                label="Numero de estudiante"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="userInfo.email"
                :rules="emailRules"
                label="Mail UC"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="userInfo.password"
                :rules="requiredField"
                label="Contraseña"
                :append-icon="!view_psw ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="view_psw = !view_psw"
                :type="view_psw ? 'text' : 'password'"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="userInfo.password_confirmation"
                :rules="requiredField"
                label="Confirmar Contraseña"
                :append-icon="!view_conf_pws ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="view_conf_pws = !view_conf_pws"
                :type="view_conf_pws ? 'text' : 'password'"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
              :disabled="!valid"
              class="mr-4"
              color="success"
              @click="registerUser(userInfo)"
              >
              Registrarse
              </v-btn>
              <v-btn
              to="/"
              class="mr-4"
              color="red"
              >
              Cancelar
            </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </v-app>
</template>

<script>


  export default {
    data: () => ({
      valid: false,
      loading: false,
      view_psw: false,
      view_conf_pws: false,
      userInfo: {
        name: '',
        student_number: '',
        email: '',
        password:'',
        password_confirmation: ''
      },
      requiredField: [
        v => !!v || 'Campo requerido',
      ],
      emailRules: [
        v => !!v || 'Mail-UC es requerido',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
    methods: {
      async registerUser(userInfo) {
        this.$store.commit('changeLoaderState', true)
        try {
          await this.$axios.post('/api/v1/auth/', userInfo)
          this.$auth.loginWith('customLocalStrategy', {
            data: {
              email: userInfo.email,
              password: userInfo.password
            }
          })
          this.$store.commit('changeLoaderState', false)
          this.$notifier.showMessage({ content: 'Bienvenido!', color: 'success' })
        } catch(error) {
          this.$notifier.showMessage({ content: 'Credenciales Invalidas', color: 'red' })
          this.$store.commit('changeLoaderState', false)
        }
      }
    }
  }
</script>

<style>

</style>