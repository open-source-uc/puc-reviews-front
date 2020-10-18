<template>
  <v-card>
    <h3>Agregar Ramos a un Profesor</h3>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="teacherCourseInfo.teacher_id"
              solo
              flat
              hide-details
              no-data-text="Sin entradas..."
              :items="teachers"
              item-value="id"
              item-text="name"
              :rules="$store.state.requiredField"
              @click="getTeachers"
              label="Profesor">
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              v-model="teacherCourseInfo.course_id"
              solo
              flat
              hide-details
              no-data-text="Sin entradas..."
              :items="courses"
              item-value="id"
              item-text="name"
              :rules="$store.state.requiredField"
              @click="getCourses"
              label="Ramo">
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-btn
            :disabled='!valid'
            class="mr-4"
            color="success"
            @click="submitTeacherCourse(teacherCourseInfo)"
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
        teachers: [],
        courses: [],
        valid: false,
        teacherCourseInfo: {
          teacher_id: '',
          course_id: ''
        }
      }
  },
  methods: {
    async submitTeacherCourse(data) {
      try {
        const response = await this.$axios.post('/api/v1/teacher_courses', data)
        this.$notifier.showMessage({ content: 'Exito al crear!', color: 'success' })
        this.clearForm()
      } catch(error) {
        const message = error.response.data.detail
        this.$notifier.showMessage({ content: message, color: 'red' })
      }
    },
    async getTeachers() {
        const response = await this.$axios.get(`/api/v1/teachers`)
        const items = response.data
        this.teachers = items
      },
    async getCourses() {
      const response = await this.$axios.get(`/api/v1/courses`)
      const items = response.data
      this.courses = items
    },
    clearForm() {
      this.teacherCourseInfo.teacher_id = ''
      this.teacherCourseInfo.course_id = ''
    }
  }
}
</script>

<style>

</style>