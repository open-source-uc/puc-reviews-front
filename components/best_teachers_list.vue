<template>
  <v-card
  class="pa-2"
  style="text-align: center;"
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
    <v-row v-if="teachers.length != 0" dense
    style="text-align: left;">
      <v-carousel
      v-if="$vuetify.breakpoint.width > 500"
      height="420"
      cycle
      >
      <v-sheet
        color="blue lighten-2">
        <v-carousel-item
        v-for="(item, i) in teachers"
        :key="i">
          <v-card
            width="350"
            max-height="400"
            color="#385F73"
            dark
            class="mx-auto my-6"
            elevation="22"
          >
            <div class="d-flex justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>
                <v-rating
                v-model="item.rating"
                half-increments
                class="ml-2"
                dense
                length="7"
                readonly
                :size="$vuetify.breakpoint.mobile? '15' : '22'"
                background-color="yellow"
                color="yellow">
                </v-rating>
                <v-card-text class="font-italic text-wrap" style="max-width: 300px;" v-text="item.best_comment">

                </v-card-text>

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
        </v-carousel-item>
        </v-sheet>
      </v-carousel>
      <v-col
        v-else
        :cols="$vuetify.breakpoint.mobile? null : '4'"
        v-for="(item, i) in teachers"
        :key="i"
      >
        <v-card
          width="350"
          max-height="400"
          color="#385F73"
          dark
          class="text-wrap"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                class="headline"
                v-text="item.name"
              ></v-card-title>
              <v-rating
              v-model="item.rating"
              half-increments
              class="ml-2"
              dense
              length="7"
              readonly
              :size="$vuetify.breakpoint.mobile? '15' : '22'"
              background-color="yellow"
              color="yellow">
              </v-rating>
              <v-card-text class="font-italic text-wrap" style="max-width: 200px;" v-text="item.best_comment"></v-card-text>

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

    <v-row v-else>
      <v-col>
       <h6>Sin reseñas todavia <v-icon>mdi-emoticon-sad-outline</v-icon></h6><br>
       <h6>Inicie Sesión y agregue alguna!</h6>
      </v-col>
    </v-row>
  </v-container>
  </v-card>
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