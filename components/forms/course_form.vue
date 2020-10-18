<template>
  <v-card>
    <h1>Ramo</h1>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="courseInfo.name"
              :rules="$store.state.requiredField"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="courseInfo.credits"
              label="Creditos"
              :rules="$store.state.requiredField"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="courseInfo.acronym"
              label="Sigla"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              v-model="courseInfo.school_id"
              solo
              flat
              hide-details
              no-data-text="Sin entradas..."
              :items="schools"
              item-value="id"
              item-text="name"
              :rules="$store.state.requiredField"
              label="Escuela"
              @click="getSchools">
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
            :disabled='!valid'
            class="mr-4"
            color="success"
            @click="submitCourse(courseInfo)"
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
      schools: [],
      valid: false,
      courseInfo: {
        name: '',
        credits: '',
        campus: '',
        acronym: '',
        school_id: ''
      }
    }
  },
  methods: {
    async getSchools() {
        const response = await this.$axios.get(`/api/v1/schools`)
        const items = response.data
        this.schools = items
      },
      async submitCourse(data) {
        try {
          const response = await this.$axios.post('/api/v1/courses', data)
          this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
          this.clearForm()
        } catch(error) {
          const message = error.response.data.detail
          this.$notifier.showMessage({ content: message, color: 'red' })
      }
    },
    clearForm() {
      this.courseInfo.name = ''
      this.courseInfo.credits = ''
      this.courseInfo.acronym = ''
      this.courseInfo.campus = ''
      this.courseInfo.school_id = ''
    }
  }
}
</script>

<style>

</style>