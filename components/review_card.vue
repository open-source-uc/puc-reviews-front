<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    width="400"
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
      v-model="review.rating"
      style="text-align: center;"
      readonly
      length="7"
      size="32"
      >
      </v-rating>
      <h6 class="mt-2" v-if="review.teacher != null "> <v-icon>mdi-notebook</v-icon> Ramo: {{review.course.name}}</h6>
      <v-divider></v-divider>
      {{ review.general_comment }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-btn @click="show_details= !show_details">Detalles</v-btn>
        <v-icon large class="ml-6">mdi-account-circle</v-icon>

        <v-list-item-content>
          <v-list-item-title>{{review.user.name}}</v-list-item-title>
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
  props: {
    review: {
      type: Object,
      default: {
        user: {
          id: 0,
          name: "Person"
        },
        type: 'teacher',
        teacher: {
          name: "Nombre Profesor"
        },
        course: {
          name: "Nombre Ramo"
        },
        rating: 6,
        general_comment: "Me gustó"
      }
    }
  },
  data() {
    return {
      show_details: false,
    }
  }

}
</script>

<style>

</style>