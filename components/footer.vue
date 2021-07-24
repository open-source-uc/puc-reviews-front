<template>
  <v-footer
		padless
		dark
	>
      <v-card
        flat
        tile
        width="100%"
        class="bg-dark lighten-1 text-center"
      >

        <v-card-text class="white--text">
          por Alfredo Enrione. <a href="mailto:aenrione@uc.cl">aenrione@uc.cl</a>
					<br>
					<a href="https://github.com/puc-reviews">
						<v-icon size="24px">
              {{githubIcon}}
            </v-icon>
					</a>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>

export default {
  components: {
  },
  data: function(){
    return {
     githubIcon: "mdi-github" 
    }
  },
  methods: {
	}
}
</script>

<style>

</style>