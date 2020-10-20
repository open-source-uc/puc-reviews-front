<template>
<v-app>
  <v-card
  class="pa-2"
  :max-width="$vuetify.breakpoint.width">

  <v-chip
    class="mx-auto ml-6"
    color="indigo darken-3"
    outlined
  >
    <v-icon left>
      mdi-fire
    </v-icon>
    {{title}}
  </v-chip>
  <v-container>
    <v-row dense>
      <v-col
        :cols="$vuetify.breakpoint.mobile? null : '4'"
        v-for="(item, i) in teachers"
        :key="i"
      >
        <v-card
          width="350"
          max-height="320"
          color="#385F73"
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="item.name"
              ></v-card-title>
              <v-rating
              v-model="item.rating"
              class="ml-2"
              dense
              length="7"
              readonly
              size="15"
              background-color="yellow"
              color="yellow">
              </v-rating>
              <v-card-text class="font-italic" v-text="item.best_comment">""</v-card-text>

              <v-card-actions>
                <v-btn
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="openProfile(item.id)"
                >
                  PERFIL
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </v-card>
</v-app>

</template>

<script>
import widget_teacher_profile from "@/components/widget_teacher_profile.vue"

export default {
  components: {
    widget_teacher_profile
  },
  props:{
    title: {
      type: String,
      default: "Mejores Profesores"
    },
    teachers: {
      type: Array,
      default() {
        return []
      }
    },
    requested: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({}),
  methods: {
    async getTeacherInfo(id) {
          this.$store.commit('changeRequestedEntityInfo', false);

          this.$store.commit('changeCurrentEntityType', 'teacher')
          const teacherResponse = await this.$axios.get(`/api/v1/teachers/${id}/`)
          this.$store.commit('changeEntityInfo', teacherResponse.data);

          const reviewsResponse = await this.$axios.get(`/api/v1/teacher_reviews/teacher/${id}/`)
          this.$store.commit('changeEntityReviews', reviewsResponse.data);

          this.$store.commit('changeRequestedEntityInfo', true);
      },
      async openProfile(new_id) {
        await this.getTeacherInfo(new_id);
        this.$store.commit('openProfile');
      }
  }
}
</script>

<style>

</style>