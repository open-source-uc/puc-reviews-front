export default {
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
  plugins: [ '@/plugins/bootstrap-vue', '@/plugins/vuetify'],
  buildModules: [
      // Simple usage
      '@nuxtjs/vuetify',

      // With options
      ['@nuxtjs/vuetify', { /* module options */ }]
    ]
}
