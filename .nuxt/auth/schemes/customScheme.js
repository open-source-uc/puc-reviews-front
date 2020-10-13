import LocalScheme from '@nuxtjs/auth/lib/schemes/local'

export default class CustomScheme extends LocalScheme {
  // Override `login` method of `local` scheme
  async login (endpoint) {
    if (!this.options.endpoints.login) {
      return
    }

    // Ditch any leftover local tokens before attempting to log in
    await this.$auth.reset()

    const { response, result } = await this.$auth.request(
      endpoint,
      this.options.endpoints.login,
      true
    )

    if (this.options.tokenRequired) {
      const token = this.options.tokenType
        ? this.options.tokenType + ' ' + result
        : result

      this.$auth.setToken(this.name, token)
      this._setToken(token)
    }
    let user = response.data.data
    user.client = response.headers.client
    user.uid = response.headers.uid
    user['access-token'] = response.headers['access-token']
    if (this.options.autoFetchUser) {
      await this.$auth.setUser(user)
    }

    return response
  }
}
