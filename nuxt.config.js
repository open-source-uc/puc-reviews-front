export default {
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  head: {
    title: 'Alf-NUXT',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'my website description'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  plugins: [ '@/plugins/bootstrap-vue', '@/plugins/notifier.js'],
  build: {
    transpile: ['@nuxtjs/auth']
  },
  buildModules: [
      // Simple usage
      '@nuxtjs/vuetify',
      '@nuxtjs/auth',
      '@nuxtjs/axios',

      // With options
      ['@nuxtjs/vuetify', { /* module options */ }]
    ],
    auth: {
      strategies: {
        customStrategy: {
          _scheme: '~/schemes/customScheme',
          endpoints: {
            login: { url: 'http://localhost:3000/api/v1/auth/sign_in', method: 'post', propertyName: 'access-token' },
            logout: { url: 'http://localhost:3000/api/v1/auth/sign_out', method: 'post' },
            user: { url: 'http://localhost:3000/api/v1/auth/validate_token', method: 'get', propertyName: 'data' }
          },
          tokenRequired: true
        }
      }
    }
}
