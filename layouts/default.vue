<template>
    <div class="wrapper min-vh-100" :class="{ 'nav-open': $sidebar.showSidebar }">
        <side-bar :background-color="sidebarBackground" short-title="SC" title="Series Control">
            <template #links>
                <sidebar-item
                    :link="{
                        name: 'Inicio',
                        icon: 'ni ni-tv-2 text-primary',
                        path: '/',
                    }"
                />
                <sidebar-item
                    :link="{
                        name: 'Catalogo',
                        icon: 'ni ni-bullet-list-67 text-red',
                        path: '/catalog',
                    }"
                />
                <sidebar-item
                    :link="{
                        name: 'Dashboard',
                        icon: 'ni ni-sound-wave text-primary',
                        path: '/dashboard',
                    }"
                />

                <sidebar-item
                    :link="{
                        name: 'Histórico',
                        icon: 'ni ni-compass-04 text-default',
                        path: '/animehistory',
                    }"
                />
                <!-- 
                <sidebar-item
                    :link="{
                        name: 'Icons',
                        icon: 'ni ni-planet text-blue',
                        path: '/icons',
                    }"
                />
                <sidebar-item
                    :link="{
                        name: 'Maps',
                        icon: 'ni ni-pin-3 text-orange',
                        path: '/maps',
                    }"
                />
                <sidebar-item
                    :link="{
                        name: 'User Profile',
                        icon: 'ni ni-single-02 text-yellow',
                        path: '/profile',
                    }"
                />
                
                <sidebar-item
                    :link="{
                        name: 'Login',
                        icon: 'ni ni-key-25 text-info',
                        path: '/login',
                    }"
                />
                <sidebar-item
                    :link="{
                        name: 'Register',
                        icon: 'ni ni-circle-08 text-pink',
                        path: '/register',
                    }"
                /> -->
            </template>
        </side-bar>
        <div class="main-content min-vh-100 bg-gradient-success" :data="sidebarBackground">
            <dashboard-navbar></dashboard-navbar>

            <div class="min-vh-100" @click="toggleSidebar">
                <!-- pb-8 pt-md-8-->
                <base-header type="gradient-success" class="pb-6 pt-5" />
                <!-- mt--7 -->
                <div class="container-fluid flex-fill footer-discount">
                    <nuxt />
                </div>
                <content-footer v-if="!$route.meta.hideFooter" class="position-fixed"></content-footer>
            </div>
        </div>
        <modal-alert />
    </div>
</template>
<script>
import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'

export default {
    components: {
        DashboardNavbar,
        ContentFooter,
    },
    data() {
        return {
            sidebarBackground: 'vue', // vue|blue|orange|green|red|primary
        }
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false)
            }
        },
    },
}
</script>
<style scoped>
@media (max-width: 576px) {
    .position-fixed {
        bottom: 0;
        right: 0;
        left: 0;
    }
}

@media (min-width: 576px) {
    .position-fixed {
        bottom: 0;
        right: 0;
        left: 250px;
    }
}

.footer-discount {
    padding-bottom: 45px;
}
</style>
