// import { reactive } from 'vue'
import Vue from 'vue'
import Sidebar from './SideBar.vue'
import SidebarItem from './SidebarItem.vue'

const SidebarStore = Vue.observable({
    showSidebar: false,
    sidebarLinks: [],
    isMinimized: false,
    displaySidebar(value) {
        this.showSidebar = value
    },
    toggleMinimize() {
        document.body.classList.toggle('sidebar-mini')
        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(() => {
            window.dispatchEvent(new Event('resize'))
        }, 180)

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(() => {
            clearInterval(simulateWindowResize)
        }, 1000)

        this.isMinimized = !this.isMinimized
    },
})

const SidebarPlugin = {
    install(app, options) {
        if (options && options.sidebarLinks) {
            SidebarStore.sidebarLinks = options.sidebarLinks
        }

        app.config.globalProperties.$sidebar = SidebarStore
        app.component('SideBar', Sidebar)
        app.component('SidebarItem', SidebarItem)
    },
}

export default SidebarPlugin
