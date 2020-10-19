export const state = () => ({
  showReviewForm: false,
  showProfile: false,
  loader: false,
  requiredField: [
    v => !!v || 'Campo requerido',
  ],
  emailRules: [
    v => !!v || 'Mail-UC es requerido',
    v => /.+@.+/.test(v) || 'Mail debe ser valido',
  ],
})

export const mutations = {
  openReviewsForm (state) {
    state.showReviewForm = true
  },
  closeReviewsForm (state) {
    state.showReviewForm = false
  },
  changeLoaderState (state, value) {
    state.loader = value
  },
  openProfile (state) {
    state.showProfile = true
  },
  closeProfile (state) {
    state.showProfile = false
  },
}