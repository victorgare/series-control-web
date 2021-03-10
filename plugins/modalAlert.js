import Vue from 'vue'
import ModalAlert from '~/components/ModalAlert/ModalAlert.vue'

const Modal = {
    install(Vue) {
        this.EventBus = new Vue()

        Vue.component('ModalAlert', ModalAlert)

        Vue.prototype.$modalAlert = {
            show(params) {
                Modal.EventBus.$emit('show', params)
            },

            showSuccess(params) {
                params.type = 'success'
                this.show(params)
            },

            showError(params) {
                params.type = 'error'
                this.show(params)
            },

            showWarning(params) {
                params.type = 'warning'
                this.show(params)
            },

            showInfo(params) {
                params.type = 'info'
                this.show(params)
            },
        }
    },
}

Vue.use(Modal)

export default Modal
