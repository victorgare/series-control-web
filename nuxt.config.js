import dotenv from 'dotenv'
dotenv.config()
const BaseRoute = process.env.BASE_ROUTE

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'series-control-web',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/vendor/nucleo/css/nucleo.css',
        '~/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css',
        '~/assets/scss/argon.scss',
        { src: '~/assets/custom.css', lang: 'css' },
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/argon-dashboard.js',
        '~/plugins/globalComponents.js',
        '~/plugins/globalDirectives.js',
        '~/plugins/sidebar.js',
        '~/plugins/modalAlert.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        // '@nuxtjs/stylelint-module',
        '@nuxtjs/dotenv',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/auth',
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        https: false,
        baseURL: BaseRoute,
        browserBaseURL: BaseRoute,
        progress: true,
        retry: { retries: 3 },
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
    },
    router: {
        middleware: ['auth'],
    },
    auth: {
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/login',
            home: '/',
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/user/login',
                        method: 'post',
                        propertyName: 'token',
                    },
                    // logout: { url: BaseRoute + '/auth/logout', method: 'post' },
                    user: {
                        url: '/user',
                        method: 'get',
                        propertyName: 'data',
                    },
                },
                // tokenRequired: true,
                // tokenType: 'bearer',
                // globalToken: true,
                // autoFetchUser: true
            },
        },
    },
}
