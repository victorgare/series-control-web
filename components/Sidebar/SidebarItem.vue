<template>
    <li class="nav-item">
        <router-link
            :to="link.path"
            class="nav-link"
            :target="link.target"
            :href="'#' + link.path"
            @click.native="linkClick"
        >
            <i :class="link.icon"></i>
            <span class="nav-link-text">{{ link.name }}</span>
        </router-link>
    </li>
</template>
<script>
export default {
    name: 'SidebarItem',
    inject: {
        autoClose: {
            default: true,
        },
    },
    props: {
        link: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    path: '',
                    children: [],
                }
            },
            description: 'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info',
        },
    },
    data() {
        return {
            children: [],
            collapsed: true,
        }
    },
    methods: {
        linkClick() {
            if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
                this.$sidebar.displaySidebar(false)
            }
        },
    },
}
</script>
