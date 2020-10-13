<template>
  <v-card
    class="mx-auto mt-6 pa-4"
    max-width="400"
  >
  <h1>Iniciar Sesión</h1>
    <v-form v-model="valid">
      <v-container>
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
              :rules="requiredFiled"
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
            <v-btn
            :disabled="!valid"
            class="mr-4 btn-success"
            @click="loginUser(userInfo)"
            >
            Iniciar
          </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      view_psw: false,
      requiredFiled: [
        v => !!v || 'Campo requerido',
      ],
      emailRules: [
        v => !!v || 'Mail-UC es requerido',
        v => /.+@.+/.test(v) || 'Mail debe ser valido',
      ],
      userInfo: {
        email: '',
        password: ''
      },
    }),
    methods: {
      async loginUser(userInfo) {
        try {
          let response = await this.$auth.loginWith('customStrategy', {
          data: userInfo
        })
        this.$notifier.showMessage({ content: 'Bienvenido, ' + this.$auth.user.name, color: 'success' })
        } catch(error) {
          this.$notifier.showMessage({ content: 'Hubo un problema al iniciar sesión', color: 'red' })
        }
      }
    }
  }
</script>

<style>

</style>
