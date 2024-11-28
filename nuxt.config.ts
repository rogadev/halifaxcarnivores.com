// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-icon',
    'shadcn-nuxt'
  ],

  css: ['@/assets/main.css'],

  supabase: {
    // Remove redirectOptions to allow unrestricted access
  },

  compatibilityDate: '2024-08-27',

  runtimeConfig: {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY
  }
});
