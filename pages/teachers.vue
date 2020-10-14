<template>
  <v-app>
    <h3 class="mx-auto mt-6">Profesores</h3>
    <v-card
    class="mx-auto mt-6"
    width="1000">
      <b-table
      ref="table"
      striped
      :items="getTeachers"
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
          <h3>Ramos que imparte {{row.item.name}}</h3>
          {{row.item.courses}}
        </b-card>
      </template>
      <template v-slot:empty>
        <center><h5>No se encontraron profesores.</h5></center>
      </template>
    </b-table>
    </v-card>
  </v-app>
</template>

<script>

export default {
  data: function(){
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
            key: 'email',
            label: 'Email',
            sortable: true,
          },
          {
            key: 'show_details',
            label: 'Ramos'
          },
        ],
    }
  },
  methods: {
      getTeachers() {
        const promise = this.$axios.get(`/api/v1/teachers`)
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
