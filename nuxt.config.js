export default {
  server: {
    port: process.env.PORT || 8000
  },
  ssr: false,
  env: {
    google_client_id: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: 'Reseñas PUC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'puc-reviews',
        name: 'reseñas-puc',
        content: 'Revisa tu proxima elección de semestre'
      }
    ],
  },
  plugins: [ '@/plugins/bootstrap-vue', '@/plugins/notifier.js', '~/plugins/axios.js'],
  build: {
    transpile: ['@nuxtjs/auth']
  },
  buildModules: [
      '@nuxtjs/vuetify',
      '@nuxtjs/auth',
      '@nuxtjs/axios'
    ],
    auth: {
      strategies: {
        customLocalStrategy: {
          _scheme: '~/schemes/customLocalScheme',
          endpoints: {
            login: { url: '/api/v1/auth/sign_in', method: 'post', propertyName: 'access-token' },
            logout: { url: '/api/v1/auth/sign_out', method: 'delete' },
            user: { url: '/api/v1/auth/validate_token', method: 'get', propertyName: 'data' }
          },
          tokenRequired: true,
        },
        google: {
        client_id: process.env.GOOGLE_CLIENT_ID || '682162585296-hrpuv5n8pgh1rt3mmgq6e52vqhe8h9iq.apps.googleusercontent.com'
       },
      }
    },
    axios: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000'
    }
}
