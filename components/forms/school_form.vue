<template>
  <v-card>
    <h1>Escuela</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="schoolInfo.name"
              :rules="$store.state.requiredField"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              v-model="schoolInfo.faculty_id"
              solo
              flat
              hide-details
              no-data-text="Sin entradas..."
              :items="faculties"
              item-value="id"
              item-text="name"
              :rules="$store.state.requiredField"
              @click="getFaculties"
              label="Facultad">
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
            :disabled='!valid'
            class="mr-4"
            color="success"
            @click="submitSchool(schoolInfo)"
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
      faculties: [],
      valid: false,
      schoolInfo: {
        name: '',
        faculty_id: ''
      }
    }
  },
  methods: {
    async getFaculties() {
        const response = await this.$axios.get(`/api/v1/faculties`)
        const items = response.data
        this.faculties = items
      },
      async submitSchool(data) {
        try {
          const response = await this.$axios.post('/api/v1/schools', data)
          this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
          this.clearForm()
        } catch(error) {
          const message = error.response.data.detail
          this.$notifier.showMessage({ content: message, color: 'red' })
      }
    },
    clearForm() {
      this.schoolInfo.name = ''
      this.schoolInfo.faculty_id = ''
    }
  }

}
</script>

<style>

</style>