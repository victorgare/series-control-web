import Vue from 'vue'
import Sidebar from '~/components/Sidebar/SideBar.vue'
import SidebarItem from '~/components/Sidebar/SidebarItem.vue'

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

Vue.component('SideBar', Sidebar)
Vue.component('SidebarItem', SidebarItem)
export default ({ app }, inject) => {
    inject('sidebar', SidebarStore)
}
