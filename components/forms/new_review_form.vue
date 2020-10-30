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
                  no-data-text="Nada que mostrar, introduzca algo"
                  item-text="name"
                  label="Nombre profesor"
                  @change="getTeacherCourses"
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
                  :disabled="!teacherReviewInfo.teacher_id"
                  v-model="teacherReviewInfo.course_id"
                  clearable
                  filled
                  solo
                  no-data-text="Nada que mostrar, introduzca algo"
                  :items="teacher_courses"
                  item-value="id"
                  item-text="autocomplete_name"
                  :rules="requiredField"
                  :label="teacher_courses.length == 0 ? 'Seleccione un profesor' : 'Nombre o Sigla' ">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Califica a este profesor:</h5>
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

              <v-row class="my-6 mx-auto" v-if="teacherReviewInfo.rating == 0">
                <h6 class="red--text">Ingrese una nota valida!</h6>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Comentario General"
                    auto-grow
                    rows="1"
                    v-model="teacherReviewInfo.general_comment"
                    :rules="requiredField"
                    counter="200"
                    required>
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Áspectos positivas"
                    auto-grow
                    rows="1"
                    counter="144"
                    v-model="teacherReviewInfo.positive_comment"
                    >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    label="Áspectos negativas"
                    auto-grow
                    rows="1"
                    counter="144"
                    v-model="teacherReviewInfo.negative_comment"
                    >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row>
              </v-row>

              <v-row v-if="showAnonymous">
                <v-col>
                <v-checkbox
                  v-model="teacherReviewInfo.anonymous"
                  label="Esconder nombre?"
                ></v-checkbox>
                </v-col>
                <v-col class="py-6" cols="8">
                   <v-icon color="red"> mdi-exclamation-thick </v-icon><strong class="red--text body-1">Escribe siempre a partir del respeto</strong> 
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-btn
                  :disabled="!valid || teacherReviewInfo.rating == 0 || $store.state.loader"
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
                <v-col cols="2">
                  <v-btn icon @click="showAnonymous = !showAnonymous"><v-icon v-if="!showAnonymous">mdi-eye</v-icon><v-icon v-else>mdi-eye-off</v-icon></v-btn>
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
                  no-data-text="Nada que mostrar, introduzca algo"
                  solo
                  clearable
                  :search-input.sync="course_name_search"
                  :items="courses"
                  item-value="id"
                  item-text="autocomplete_name"
                  label="Nombre ramo"
                  @keydown="updateCourses(course_name_search)">
                  </v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <h5>Califica este ramo:</h5>
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

              <v-row class="my-6 mx-auto" v-if="courseReviewInfo.rating == 0">
                <h6 class="red--text">Ingrese una nota valida!</h6>
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    auto-grow
                    rows="1"
                    v-model="courseReviewInfo.general_comment"
                    :rules="requiredField"
                    counter="200"
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
                    label="Áspectos positivas"
                    counter="144"
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
                    label="Áspectos negativas"
                    counter="144"
                    >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row v-if="showAnonymous">
                <v-col>
                <v-checkbox
                  v-model="courseReviewInfo.anonymous"
                  label="Esconder nombre?"
                ></v-checkbox>
                </v-col>
                <v-col class="py-6" cols="8">
                   <v-icon color="red"> mdi-exclamation-thick </v-icon><strong class="red--text body-1">Escribe siempre a partir del respeto</strong> 
                </v-col>
              </v-row>

              <v-row>
                <v-col class="mt-6">
                  <v-btn
                  :disabled="!valid || courseReviewInfo.rating == 0 || $store.state.loader"
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
                <v-col cols="2">
                  <v-btn icon @click="showAnonymous = !showAnonymous"><v-icon v-if="!showAnonymous">mdi-eye</v-icon><v-icon v-else>mdi-eye-off</v-icon></v-btn>
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
    data: () => ({
      showAnonymous: false,
      tab: null,
      teachers: [],
      teacher_courses: [],
      courses: [],
      valid: false,
      requiredField: [
        v => !!v || 'Campo requerido',
      ],
      teacherReviewInfo: {
        rating: 0,
        teacher_id: null,
        course_id: null,
        general_comment: '',
        positive_comment: '',
        negative_comment: '',
        anonymous: false,
      },
      courseReviewInfo: {
        rating: 0,
        course_id: null,
        general_comment: '',
        positive_comment: '',
        negative_comment: '',
        recommended: true,
        anonymous: false,
      },
      teacher_name_search: undefined,
      course_name_search: undefined
    }),
    methods: {
      async getTeacherCourses() {
        if (this.teacherReviewInfo.teacher_id == undefined) {
          this.teacherReviewInfo.teacher_id = null
        }
        try {
          const teacherCoursesResponse = await this.$axios.get(`/api/v1/teachers/courses/${this.teacherReviewInfo.teacher_id}`)
          this.teacher_courses = teacherCoursesResponse.data
        }
        catch(error) {
        }
      },
      async createTeacherReview(data) {
        data.student_name = this.$auth.user.name
        data.student_email = this.$auth.user.email
        this.$store.commit('changeLoaderState', true)
        this.$store.commit('closeReviewsForm')
        try {
          const response = await this.$axios.post('/api/v1/teacher_reviews', data)
          await this.getEntityInfo(data.teacher_id, 'teacher')
          this.$store.commit('changeLoaderState', false)
          this.teacherReviewInfo = {
              rating: 0,
              teacher_id: null,
              course_id: null,
              general_comment: '',
              positive_comment: '',
              negative_comment: '',
            }
          this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
        } catch(error) {
          this.$notifier.showMessage({ content: 'Ya ha escrito sobre este profesor y ramo', color: 'red' })
          this.$store.commit('changeLoaderState', false)
        }
    },
      async createCourseReview(data) {
        data.student_name = this.$auth.user.name
        data.student_email = this.$auth.user.email
        this.$store.commit('changeLoaderState', true)
        this.$store.commit('closeReviewsForm')
        try {
            const response = await this.$axios.post('/api/v1/course_reviews', data)
            await this.getEntityInfo(data.course_id, 'course')
            this.courseReviewInfo = {
              rating: 0,
              course_id: null,
              general_comment: '',
              positive_comment: '',
              negative_comment: '',
              recommended: true
            }
            this.$store.commit('changeLoaderState', false)
            this.$notifier.showMessage({ content: 'Exito!', color: 'success' })
          } catch(error) {
            this.$notifier.showMessage({ content: 'Ya ha escrito sobre este ramo', color: 'red' })
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
      async getEntityInfo(id, type) {

        this.$store.commit('changeRequestedEntityInfo', false);
        let path = undefined
        if (type == 'teacher') {
          this.$store.commit('changeCurrentEntityType', type)
          path = 'teachers'
        } else if (type == 'course') {
          path = 'courses'
          this.$store.commit('changeCurrentEntityType', type)
        }
        if (path != undefined){
          const Response = await this.$axios.get(`/api/v1/${path}/${id}`)
          this.$store.commit('changeEntityInfo',Response.data)
          if (type == 'teacher') {
            const ReviewsResponse = await this.$axios.get(`/api/v1/teacher_reviews/teacher/${id}`)
            this.$store.commit('changeEntityReviews',ReviewsResponse.data)
          } else {
            const ReviewsResponse = await this.$axios.get(`/api/v1/course_reviews/course/${id}`)
            this.$store.commit('changeEntityReviews',ReviewsResponse.data)
          }
        this.$store.commit('changeRequestedEntityInfo', true);
        this.$store.commit('openProfile')
        }
      },
    }
  }
</script>

<style>
</style>
