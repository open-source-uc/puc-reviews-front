export const state = () => ({
  showReviewForm: false
})

export const mutations = {
  openReviewsForm (state, value) {
    state.showReviewForm = true
  },
  closeReviewsForm (state, value) {
    state.showReviewForm = false
  },
}