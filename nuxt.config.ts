// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['primeicons/primeicons.css', '~/assets/css/main.css'],
    imports: {
        dirs: ['types/*.ts'],
    },
    modules: [
        '@primevue/nuxt-module'
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
