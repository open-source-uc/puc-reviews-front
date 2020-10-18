<template>
  <v-card>
    <h1>Profesor</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="teacherInfo.name"
              :rules="$store.state.requiredField"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="teacherInfo.email"
              :rules="$store.state.emailRules"
              label="Email"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
            :disabled='!valid'
            class="mr-4"
            color="success"
            @click="submitTeacher(teacherInfo)"
            >
            Crear
          </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      teacherInfo: {
        name: '',
        email: ''
      },
    }
  },
  methods: {
    async submitTeacher(data) {
      try {
        const response = await this.$axios.post('/api/v1/teachers', data)
        this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
        this.clearForm()
      } catch(error) {
        const message = error.response.data.detail
        this.$notifier.showMessage({ content: message, color: 'red' })
      }
    },
    clearForm() {
      this.teacherInfo.name = ''
      this.teacherInfo.email = ''
    }
  }
}
</script>

<style>

</style>