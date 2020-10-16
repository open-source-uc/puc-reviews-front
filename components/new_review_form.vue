<template>
  <v-app>
    <v-card>
      <v-tabs
        v-model="tab"
        class="bg-dark"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Profesor
          <v-icon>mdi-human-greeting</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Ramo
          <v-icon>mdi-pencil</v-icon>
        </v-tab>
      </v-tabs>
      <!-- TAB 1 CONTENT-->
      <v-tabs-items v-model="tab">
        <v-tab-item
          :key="1"
          :value="'tab-' + 1"
          class="pa-4"
        >
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col>
                  <h5>Nota:</h5>
                  <v-rating
                  v-model="teacherReviewInfo.rating"
                  style="text-align: center;"
                  half-increments
                  length="7"
                  size="32"
                  required>
                  </v-rating>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Profesor</h5>
                  <v-autocomplete
                  :disabled="(teachers.length == 0)"
                  v-model="teacherReviewInfo.teacher_id"
                  filled
                  solo
                  :items="teachers"
                  item-value="id"
                  item-text="name"
                  label="Profesor"
                  @change="getTeacherCourses(teacherReviewInfo.teacher_id)">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Ramo que tomó con él</h5>
                  <v-autocomplete
                  :disabled="(teacher_courses.length == 0)"
                  v-model="teacherReviewInfo.course_id"
                  filled
                  solo
                  :items="teacher_courses"
                  item-value="id"
                  item-text="name"
                  :rules="requiredField"
                  :label="teacher_courses.length == 0 ? 'Seleccione un profesor' : 'Ramo' ">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Comentario General</h5>
                  <v-text-field
                    v-model="teacherReviewInfo.general_comment"
                    :rules="requiredField"
                    label="comentario"
                    required>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Cosas que hizo bien</h5>
                  <v-text-field
                    v-model="teacherReviewInfo.positive_comment"
                    label="pros"
                    >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Cosas que hizo mal</h5>
                  <v-text-field
                    v-model="teacherReviewInfo.negative_comment"
                    label="contras"
                    >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-btn
                  :disabled="!valid"
                  class="mr-4"
                  color="success"
                  @click="createTeacherReview(teacherReviewInfo)"
                  >
                  Enviar
                </v-btn>
                <v-btn
                color="red"
                @click="$store.commit('closeReviewsForm')">
                  Cerrar
                </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-tab-item>
        <!-- TAB 2 CONTENT-->
        <v-tab-item
          :key="2"
          :value="'tab-' + 2"
          class="pa-4"
        >
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col>
                  <h5>Nota:</h5>
                  <v-rating
                  v-model="courseReviewInfo.rating"
                  style="text-align: center;"
                  half-increments
                  length="7"
                  size="32"
                  required>
                  </v-rating>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Ramo</h5>
                  <v-autocomplete
                  :disabled="(courses.length == 0)"
                  v-model="courseReviewInfo.course_id"
                  filled
                  solo
                  :items="courses"
                  item-value="id"
                  item-text="name"
                  label="Ramo">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="courseReviewInfo.general_comment"
                    :rules="requiredField"
                    label="Comentario General"
                    required>
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="courseReviewInfo.positive_comment"
                    label="Cosas positivas"
                    >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="courseReviewInfo.negative_comment"
                    label="Cosas negativas"
                    >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-btn
                  :disabled="!valid"
                  class="mr-4"
                  color="success"
                  @click="createCourseReview(courseReviewInfo)"
                  >
                  Enviar
                  </v-btn>
                  <v-btn
                  color="red"
                  @click="$store.commit('closeReviewsForm')">
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
  export default {
    mounted() {
      this.setOptions()
    },
    data: () => ({
      tab: null,
      teachers: [],
      teacher_courses: [],
      courses: [],
      valid: false,
      requiredField: [
        v => !!v || 'Campo requerido',
      ],
      teacherReviewInfo: {
        rating: 3,
        teacher_id: null,
        course_id: null,
        general_comment: '',
        positive_comment: '',
        negative_comment: '',
      },
      courseReviewInfo: {
        rating: 3,
        course_id: null,
        general_comment: '',
        positive_comment: '',
        negative_comment: '',
        recommended: true
      }
    }),
    methods: {
      async setOptions() {
          const teacherResponse = await this.$axios.get(`/api/v1/teachers`)
          this.teachers = teacherResponse.data
          const courseResponse = await this.$axios.get(`/api/v1/courses`)
          this.courses = courseResponse.data
      },
      async getTeacherCourses(teacher_id) {
          const teacherCoursesResponse = await this.$axios.get(`/api/v1/teachers/courses?id=${teacher_id}`)
          this.teacher_courses = teacherCoursesResponse.data

      },
        async createTeacherReview(data) {
          $store.commit('closeReviewsForm')
          try {
            const response = await this.$axios.post('/api/v1/teacher_review/new', data)
            this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
          } catch(error) {
            this.$notifier.showMessage({ content: 'Error', color: 'red' })
          }
      },
        async createCourseReview(data) {
          $store.commit('closeReviewsForm')
          try {
              const response = await this.$axios.post('/api/v1/course_review/new', data)
              this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
            } catch(error) {
              this.$notifier.showMessage({ content: 'Error', color: 'red' })
            }
        },
    }
  }
</script>

<style>
</style>
