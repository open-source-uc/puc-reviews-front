<template>
  <v-card
    class="mx-auto"
    :color="color"
    dark
    width="400"
    :elevation="index ? '22': ''"
  >
    <v-card-title>
      <template v-if="review.teacher == null">
        <v-icon
        large
        left
        >
        mdi-notebook
      </v-icon>
      <span class="title font-weight-light">{{review.course.name}}</span>
      </template>

      <template v-else>
        <v-icon
        large
        left
        >
        mdi-human-greeting
      </v-icon>
      <span class="title font-weight-light">{{review.teacher.name}}</span>
      </template>

    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      <v-rating
      color="white"
      background-color="white"
      v-model="number_rating"
      style="text-align: center;"
      half-increments
      readonly
      length="7"
      :size="$vuetify.breakpoint.xs ? '20':'28'"
      >
      </v-rating><p class="body-2">({{review.rating}})</p>
      <h6 class="mt-2" v-if="review.teacher != null "> <v-icon>mdi-notebook</v-icon> Ramo: {{review.course.name}}</h6>
      <v-divider></v-divider>
      <p class="body-1">{{ review.general_comment }}</p>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <template v-if="!index">
            <v-btn @click="show_details= !show_details">
            <template v-if='$vuetify.breakpoint.width > 365'>
            Detalles
            </template>
            <v-icon medium v-else>mdi-details</v-icon>
          </v-btn>
        </template>
        <v-icon large :class="index ? '' :'ml-6'">mdi-account-circle</v-icon>

        <v-list-item-content>
          <v-list-item class="body-1" v-if="!review.anonymous">{{ getAuthorName(review) }}</v-list-item>
          <v-list-item class="body-1" v-else>Estudiante Anónimo</v-list-item>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
    <template v-if="show_details">
      <v-divider></v-divider>
        <v-row>
          <v-col class="ml-2">
            <h6><v-icon>mdi-heart</v-icon>Áspectos positivos:</h6>
          </v-col>

        </v-row>
        <v-row>
          <v-col class="ml-2">
            {{ review.positive_comment || "no hay detalles" }}
          </v-col>
        </v-row>
         <v-row>
          <v-col class="ml-2">
            <h6><v-icon>mdi-message-minus-outline</v-icon> Áspectos negativos:</h6>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ml-2">
            {{ review.negative_comment || "no hay detalles" }}
          </v-col>
        </v-row>
    </template>
  </v-card>
</template>

<script>
export default {
  computed: {
    number_rating(){
      return Number(this.review.rating)
    }
  },
  props: {
    review: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Boolean,
      default() {
        return false
      }
    },
    color: {
      type: String,
      default() {
        return 'light-blue lighten-2'
      }
    }
  },
  data() {
    return {
      show_details: false,
    }
  },
  methods: {
    getAuthorName(review) {
      if (review.user == undefined) {
        if (review.student) {
          return review.student.name
        } else {
          return 'No definido'
        }
      } else {
        return review.user.name
      }
    },
  }

}
</script>

<style>

</style>