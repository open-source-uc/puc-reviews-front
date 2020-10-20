export const state = () => ({
  currentEntityInfo: {},
  currentEntityType: null,
  currentEntityReviews: [],
  requestedEntityInfo: false,
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
  ratingIntervals: [
    { name: '0-1', value: {min: 0, max: 1} },
    { name: '2-3', value: {min: 2, max: 3} },
    { name: '4-5', value: {min: 4, max: 5} },
    { name: '6-7', value: {min: 6, max: 7} },
  ]
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
  changeEntityInfo (state, value) {
    state.currentEntityInfo = value
  },
  changeEntityReviews (state, value) {
    state.currentEntityReviews = value
  },
  changeRequestedEntityInfo (state, value) {
    state.requestedEntityInfo = value
  },
  changeCurrentEntityType (state, value) {
    state.currentEntityType = value
  },
}