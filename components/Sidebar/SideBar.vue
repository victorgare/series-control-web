<template>
    <nav id="sidenav-main" class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white">
        <div class="container-fluid">
            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                <span class="navbar-toggler-icon"></span>
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="..." />
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
                    <base-dropdown class="nav-item" position="right">
                        <template #title>
                            <a
                                class="nav-link nav-link-icon"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i class="ni ni-bell-55"></i>
                            </a>
                        </template>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </base-dropdown>
                    <base-dropdown class="nav-item" position="right">
                        <template #title>
                            <a class="nav-link" href="#" role="button">
                                <div class="media align-items-center">
                                    <span class="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src="" />
                                    </span>
                                </div>
                            </a>
                        </template>

                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <router-link to="/logout" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </router-link>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" id="sidenav-collapse-main" class="navbar-collapse collapse show">
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo" />
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links"> </slot>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import NavbarToggleButton from '@/components/NavbarToggleButton'

export default {
    name: 'Sidebar',
    components: {
        NavbarToggleButton,
    },
    provide() {
        return {
            autoClose: this.autoClose,
        }
    },
    props: {
        logo: {
            type: String,
            default: require('~/assets/img/brand/green.png'),
            description: 'Sidebar app logo',
        },
        autoClose: {
            type: Boolean,
            default: true,
            description: 'Whether sidebar should autoclose on mobile when clicking an item',
        },
    },
    beforeUnmount() {
        if (this.$sidebar.showSidebar) {
            this.$sidebar.showSidebar = false
        }
    },
    methods: {
        closeSidebar() {
            this.$sidebar.displaySidebar(false)
        },
        showSidebar() {
            this.$sidebar.displaySidebar(true)
        },
    },
}
</script>
