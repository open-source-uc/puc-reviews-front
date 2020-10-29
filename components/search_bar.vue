<template>
  <div>
    <v-row class="px-6 pt-6">
      <v-col cols="8">
        <v-autocomplete
          v-model="entity"
          solo
          solo-inverted
          flat
          rounded
          filled
          hide-details
          :search-input.sync="search_params"
          no-data-text="Sin entradas..."
          :items="search_items"
          item-value="info"
          item-text="name"
          label="Buscar"
          clearable
          @click:clear='closeAndCleanUpEntity'
          @change="getEntityInfo"
          @keydown="getItems(search_params)">
        </v-autocomplete>
      </v-col>
      <v-col cols="4">
        <b-button
        v-if="Object.entries($store.state.currentEntityInfo).length == 0"
        size="lg"
        variant="secondary"
        @click="showInstructions"
        >
          <v-icon size="30">mdi-account-search</v-icon>
        </b-button>
        <b-button
          v-else
          size="lg"
          variant="primary"
          @click="$store.commit('openProfile')">
              <v-icon size="30">mdi-account-check</v-icon>
        </b-button>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      entity: {},
      search_params: null,
      search_items: [],
    }
  },
  methods: {
    async getItems(search_params) {
        const Response = await this.$axios.get(`/api/v1/search?name=${search_params}`)
        this.search_items = Response.data
      },
    async getEntityInfo() {
      if (this.entity == undefined) {
          this.entity = { id: '', type: ''}
      }
      let id = this.entity.id
      let type = this.entity.type

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
      }
    },
    closeAndCleanUpEntity() {
        this.$store.commit('changeEntityInfo', [])
        this.$store.commit('changeEntityReviews', [])
        this.$store.commit('changeRequestedEntityInfo', false)
        this.$store.commit('changeCurrentEntityType', null)
        this.$store.commit('closeProfile')
      },
    showInstructions() {
      this.$notifier.showMessage({ content: 'Seleccione algo para ver su perfil', color: 'primary' })
    }
  }

}
</script>

<style>

</style>