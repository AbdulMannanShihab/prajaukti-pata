// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
  ],

  supabase: {
    redirect: false,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      appName: 'প্রযুক্তি পাতা',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'bn' },
      title: 'প্রযুক্তি পাতা',
      titleTemplate: '%s | প্রযুক্তি পাতা',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'প্রযুক্তি পাতা — বাংলাদেশের সেরা টেক রিসোর্স, টিউটোরিয়াল ও কমিউনিটি প্ল্যাটফর্ম।',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700&display=swap',
        },
      ],
    },
  },

  devtools: { enabled: true },
})