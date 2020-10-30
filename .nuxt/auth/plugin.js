import Auth from './auth'

import './middleware'

// Active schemes
import scheme_003d9a64 from './schemes/local.js'
import scheme_239b16e0 from './schemes/customLocalScheme.js'
import scheme_23514a38 from './schemes/oauth2.js'

export default function (ctx, inject) {
  // Options
  const options = {"resetOnError":false,"scopeKey":"scope","rewriteRedirects":true,"fullPathRedirect":false,"watchLoggedIn":true,"redirect":{"login":"/login","logout":"/","home":"/","callback":"/login"},"vuex":{"namespace":"auth"},"cookie":{"prefix":"auth.","options":{"path":"/"}},"localStorage":{"prefix":"auth."},"token":{"prefix":"_token."},"refresh_token":{"prefix":"_refresh_token."},"defaultStrategy":"local"}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // local
  $auth.registerStrategy('local', new scheme_003d9a64($auth, {"endpoints":{"login":{"url":"/api/auth/login","method":"post","propertyName":"token"},"logout":{"url":"/api/auth/logout","method":"post"},"user":{"url":"/api/auth/user","method":"get","propertyName":"user"}},"_name":"local"}))

  // customLocalStrategy
  $auth.registerStrategy('customLocalStrategy', new scheme_239b16e0($auth, {"endpoints":{"login":{"url":"/api/v1/auth/sign_in","method":"post","propertyName":"access-token"},"logout":{"url":"/api/v1/auth/sign_out","method":"delete"},"user":{"url":"/api/v1/auth/validate_token","method":"get","propertyName":"data"}},"tokenRequired":true,"_name":"customLocalStrategy"}))

  // google
  $auth.registerStrategy('google', new scheme_23514a38($auth, {"client_id":"682162585296-hrpuv5n8pgh1rt3mmgq6e52vqhe8h9iq.apps.googleusercontent.com","_name":"google","authorization_endpoint":"https://accounts.google.com/o/oauth2/auth","userinfo_endpoint":"https://www.googleapis.com/oauth2/v3/userinfo","scope":["openid","profile","email"]}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
