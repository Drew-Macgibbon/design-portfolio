// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  unlighthouse: {
    scanner: {
      // simulate a desktop device
      device: 'desktop'
    }
  },
  alias: {
    assets: '/<rootDir>/assets'
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/flowbite@latest/dist/flowbite.min.css' }
      ],
      script: [{ src: 'https://unpkg.com/flowbite@latest/dist/flowbite.js' }]
    }
  },
  css: ['/assets/main.css', '@milkdown/theme-nord/style.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@nuxt/content',
    '@unlighthouse/nuxt'
  ],
  typescript: {
    shim: false
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      supabase: {
        // Options
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY
      },
      api_url: process.env.API_URL_BASE
    }
  },
  build: {
    transpile: [
      '@headlessui/vue',
      'chart.js',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/pro-light-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },
  nitro: {
    preset: 'digital-ocean'
  },
  ssr: true,
  content: {
    highlight: {
      // Theme used in all color schemes.
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.dark`
        dark: 'github-light',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    }
  }
})
