const REDIRECT_INTRUDERS_GIF = `https://i.imgur.com/1Ia9tTG.gif`

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  debug: false,
  compatibilityDate: `2024-11-01`,
  devtools: { enabled: true },
  imports: {
    scan: false
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxt/fonts',
    // '@nuxtjs/i18n',
    'shadcn-nuxt',
  ],
  devServer: { https: false, port: 3000 },
  eslint: {
    config: {
      standalone: false,
      stylistic: { indent: `tab`, quotes: `single` },
    },
  },
  nitro: {
    routeRules: {
      '/': { static: true },
      '/.env': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/.info.php': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/.phpinfo.php': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/wp-login.php': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/wp-login': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/wp-admin': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/wp-admin/**': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
      '/wp-includes/**': { redirect: { to: REDIRECT_INTRUDERS_GIF, statusCode: 302 } },
    }
  },
   runtimeConfig: {
    env: process.env.NODE_ENV,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    githubRedirectUri: process.env.GITHUB_REDIRECT_URI,
    resendApiKey: process.env.RESEND_API_KEY,
  },
  experimental: {
    writeEarlyHints: true,
    renderJsonPayloads: true,
    typedPages: true,
    headNext: true,
    viewTransition: true,
  },
  // i18n: {
  //    vueI18n: './config/i18n.config.ts'
  // },
  fonts: {
    experimental: {
      processCSSVariables: true,

    }
  },
})
