export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  ssr: false,
  head: {
    title: 'Reseñas PUC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
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
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
    ],
    auth: {
      strategies: {
        customStrategy: {
          _scheme: '~/schemes/customScheme',
          endpoints: {
            login: { url: '/api/v1/auth/sign_in', method: 'post', propertyName: 'access-token' },
            logout: { url: '/api/v1/auth/sign_out', method: 'delete' },
            user: { url: '/api/v1/auth/validate_token', method: 'get', propertyName: 'data' }
          },
          tokenRequired: true,
        },
        google: {
        client_id: '867429787247-ct516vku7u7d6n9qkmhu6hoel936gi27.apps.googleusercontent.com'
       },
      }
    },
    axios: {
      baseURL: process.env.API_URL || 'http://localhost:3000', // Used as fallback if no runtime config is provided
    },
    proxy: {
      '/api/v1': { target: 'http://localhost:3000', pathRewrite: {'^/api/v1': ''} }
    }
}
