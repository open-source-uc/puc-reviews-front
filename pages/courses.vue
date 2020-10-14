<template>
  <v-app>
      <h3 class="mx-auto mt-6">Ramos</h3>
      <v-card
      class="mx-auto mt-6 d-flex"
      width="1000">
        <b-table
        ref="table"
        striped
        :items="getCourses"
        :fields="fields"
        class="mb-0"
        no-provider-sorting
        show-empty
        responsive
        >
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2" :variant="!row.detailsShowing ? 'primary' : 'secondary'">
            {{ !row.detailsShowing ? 'Mostrar' : 'Esconder'}}
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            {{row.item.teachers}}
          </b-card>
        </template>
        <template v-slot:empty>
          <center><h5>No se encontraron ramos.</h5></center>
        </template>
      </b-table>
      </v-card>
  </v-app>
</template>

<script>

export default {
  data() {
    return{
      fields: [
          {
            key: 'global_rating',
            label: 'Nota',
            sortable: true,
          },
          {
            key: 'name',
            label: 'Nombre',
            sortable: true,
          },
          {
            key: 'credits',
            label: 'Creditos',
            sortable: true,
          },
          {
            key: 'school.name',
            label: 'Escuela',
            sortable: true
          },
          {
            key: 'campus',
            label: 'Campus',
            sortable: true
          },
          {
            key: 'show_details',
            label: 'Profesores',
            sortable: true
          },
        ],
    }
  },
  methods: {
      getCourses() {
        const promise = this.$axios.get(`/api/v1/courses`)
        return promise.then(response => {
          const items = response.data
          return items || []
        })
      }
    },
}
</script>

<style>

</style>