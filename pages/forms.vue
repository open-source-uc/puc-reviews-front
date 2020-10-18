<template>
  <v-app>
    <v-row>
      <!-- Profesores -->
      <v-col>
        <teacher_form></teacher_form>
      </v-col>

      <!-- Curso -->
      <v-col>
        <course_form></course_form>
      </v-col>

      <!-- Escuela -->
      <v-col>
        <school_form></school_form>
      </v-col>

      <!-- Facultad -->
      <v-col>
        <faculty_form></faculty_form>
      </v-col>

      <v-col>
        <teacher_course_form></teacher_course_form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import teacher_form from "@/components/forms/teacher_form.vue"
import course_form from "@/components/forms/course_form.vue"
import school_form from "@/components/forms/school_form.vue"
import faculty_form from "@/components/forms/faculty_form.vue"
import teacher_course_form from "@/components/forms/teacher_course_form.vue"


export default {
  components: {
    teacher_form,
    course_form,
    school_form,
    faculty_form,
    teacher_course_form
  },
  middleware: ['super_admin_or_helper'],
  data() {
    return {
      schoolInfo: {
        name: '',
        faculty_id: ''
      },
      facultyInfo: {
        name: ''
      }
    }
  }
}
</script>

<style>

</style>