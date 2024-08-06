// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    css: ['primeicons/primeicons.css', '~/assets/css/main.css'],
    imports: {
        dirs: ['types/*.ts'],
    },
    modules: [
        '@primevue/nuxt-module',
        '@nuxt/test-utils/module'
    ],
    primevue: {
        usePrimeVue: true,
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            },
            unstyled: false,
        },
        components: {
            prefix: 'Prime'
        }
    }
})