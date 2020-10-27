<template>
  <v-app>
    <v-card
    :width="width"
    class="mx-auto"
    max-width="600"
    max-height="400">
      <v-tabs
        v-model="tab"
        class="bg-dark"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>
        <v-container class="d-flex justify-center" >
        <v-tab to="#tab-1" class="mx-auto">
          Profesor
          <v-icon>mdi-human-greeting</v-icon>
        </v-tab>

        <v-tab to="#tab-2" class="mx-auto">
          Ramo
          <v-icon>mdi-pencil</v-icon>
        </v-tab>

        <v-btn color="red" class="ml-auto"
        @click="$store.commit('closeReviewsForm')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        </v-container>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- TAB 1 CONTENT-->
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
                  hover
                  :size="$vuetify.breakpoint.xs ? '24':'32'"
                  required>
                  </v-rating>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Profesor
                  <v-progress-circular
                  v-if="$store.state.loader"
                  class="mx-auto"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  </h5>
                  <v-autocomplete
                  :disabled="$store.state.loader"
                  v-model="teacherReviewInfo.teacher_id"
                  filled
                  solo
                  clearable
                  :search-input.sync="teacher_name_search"
                  :items="teachers"
                  item-value="id"
                  item-text="name"
                  label="Profesor"
                  @change="getTeacherCourses(teacherReviewInfo.teacher_id)"
                  @keydown="updateTeachers(teacher_name_search)">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Ramo que tomó con él
                  <v-progress-circular
                  v-if="$store.state.loader"
                  class="mx-auto"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  </h5>
                  <v-autocomplete
                  :disabled="$store.state.loader"
                  v-model="teacherReviewInfo.course_id"
                  clearable
                  filled
                  solo
                  :items="teacher_courses"
                  item-value="id"
                  item-text="autocomplete_name"
                  :rules="requiredField"
                  :label="teacher_courses.length == 0 ? 'Seleccione un profesor' : 'Ramo' ">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Comentario General"
                    auto-grow
                    rows="1"
                    v-model="teacherReviewInfo.general_comment"
                    :rules="requiredField"
                    required>
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Cosas positivas"
                    auto-grow
                    rows="1"
                    v-model="teacherReviewInfo.positive_comment"
                    >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Cosas negativas"
                    auto-grow
                    rows="1"
                    v-model="teacherReviewInfo.negative_comment"
                    >
                  </v-textarea>
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
                  hover
                  :size="$vuetify.breakpoint.xs ? '24':'32'"
                  required>
                  </v-rating>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Ramo
                    <v-progress-circular
                    v-if="$store.state.loader"
                    class="mx-auto"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  </h5>
                  <v-autocomplete
                  :disabled="$store.state.loader"
                  v-model="courseReviewInfo.course_id"
                  filled
                  solo
                  clearable
                  :search-input.sync="course_name_search"
                  :items="courses"
                  item-value="id"
                  item-text="autocomplete_name"
                  label="Ramo"
                  @keydown="updateCourses(course_name_search)">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    auto-grow
                    rows="1"
                    v-model="courseReviewInfo.general_comment"
                    :rules="requiredField"
                    label="Comentario General"
                    required>
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    auto-grow
                    rows="1"
                    v-model="courseReviewInfo.positive_comment"
                    label="Cosas positivas"
                    >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    auto-grow
                    rows="1"
                    v-model="courseReviewInfo.negative_comment"
                    label="Cosas negativas"
                    >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="mt-6">
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
    props: ['width', 'height'],
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
      },
      teacher_name_search: undefined,
      course_name_search: undefined
    }),
    methods: {
      async setOptions() {
          this.$store.commit('changeLoaderState', true)
          const teacherResponse = await this.$axios.get(`/api/v1/teachers`)
          this.teachers = teacherResponse.data
          const courseResponse = await this.$axios.get(`/api/v1/courses`)
          this.courses = courseResponse.data
          this.$store.commit('changeLoaderState', false)
      },
      async getTeacherCourses(teacher_id) {
          const teacherCoursesResponse = await this.$axios.get(`/api/v1/teachers/courses/${teacher_id}`)
          this.teacher_courses = teacherCoursesResponse.data

      },
      async createTeacherReview(data) {
        this.$store.commit('changeLoaderState', true)
        this.$store.commit('closeReviewsForm')
        try {
          const response = await this.$axios.post('/api/v1/teacher_reviews', data)
          this.$store.commit('changeLoaderState', false)
          this.teacherReviewInfo = {
              rating: 3,
              teacher_id: null,
              course_id: null,
              general_comment: '',
              positive_comment: '',
              negative_comment: '',
            }
          this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
        } catch(error) {
          this.$notifier.showMessage({ content: 'Error', color: 'red' })
          this.$store.commit('changeLoaderState', false)
        }
    },
      async createCourseReview(data) {
        this.$store.commit('changeLoaderState', true)
        this.$store.commit('closeReviewsForm')
        try {
            const response = await this.$axios.post('/api/v1/course_reviews', data)
            this.courseReviewInfo = {
              rating: 3,
              course_id: null,
              general_comment: '',
              positive_comment: '',
              negative_comment: '',
              recommended: true
            }
            this.$store.commit('changeLoaderState', false)
            this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
          } catch(error) {
            this.$notifier.showMessage({ content: 'Error', color: 'red' })
            this.$store.commit('changeLoaderState', false)
          }
      },
      async updateTeachers() {
        const response = await this.$axios.get(`/api/v1/search_teachers`,
        {
          params: {
            teacher_name: this.teacher_name_search
          }
        })
        this.teachers = response.data

      },
      async updateCourses() {
        const response = await this.$axios.get(`/api/v1/search_courses`,
        {
          params: {
            course_name: this.course_name_search
          }
        })
        this.courses = response.data
      },
    }
  }
</script>

<style>
</style>
