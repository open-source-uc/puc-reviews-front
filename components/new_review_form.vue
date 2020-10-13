<template>
  <v-card
    class="mx-auto mt-6 form-popup"
    max-width="400"
  >
  <h1>Nueva Reseña</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Mail UC"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="password"
              :rules="requiredFiled"
              label="contraseña"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
            :disabled="!valid"
            class="mr-4 btn-success"
            >
            Validate
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
      password: '',
      requiredFiled: [
        v => !!v || 'Campo requerido',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Mail-UC es requerido',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
  }
</script>

<style>
  .form-popup {
    right: 40%;
    font-size: medium;
    background-color: white;
    padding: 2%;
    display: block;
    position: fixed;
    border: 3px solid #f1f1f1;
    z-index: 9;
    box-shadow: 10px 10px 169px 23px rgba(0,0,0,0.57);;
  }
</style>
