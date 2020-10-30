<template>
  <v-app>
    <sign_in_form ></sign_in_form>
  </v-app>
</template>

<script>
import sign_in_form from "@/components/forms/sign_in_form.vue"
export default {
  middleware: ['prevent_login', 'only_oauth'],
  components: {
    sign_in_form,
  },
}
</script>

<style>

</style>