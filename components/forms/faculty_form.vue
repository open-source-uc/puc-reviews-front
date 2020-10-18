<template>
  <v-card>
    <h1>Facultad</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="facultyInfo.name"
              :rules="$store.state.requiredField"
              label="Nombre"
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
            @click="submitFactulty(facultyInfo)"
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
        facultyInfo: {
          name: ''
        }
      }
    },
  methods: {
    async submitFactulty(data) {
      try {
        const response = await this.$axios.post('/api/v1/faculties', data)
        this.$notifier.showMessage({ content: 'Exito al crear!', color: 'success' })
        this.clearForm()
      } catch(error) {
        const message = error.response.data.detail
        this.$notifier.showMessage({ content: message, color: 'red' })
      }
    },
    clearForm() {
      this.facultyInfo.name = ''
    }
  }
}
</script>

<style>

</style>