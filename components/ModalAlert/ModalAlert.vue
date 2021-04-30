<template>
    <div class="col-md-4">
        <modal :show="modal" :gradient="type" modal-classes="modal-danger modal-dialog-centered" @close="closeModal">
            <template #header>
                <h6 id="modal-title-notification" class="modal-title">{{ title }}</h6>
            </template>
            <div class="py-3 text-center">
                <i :class="getIcon"></i>
                <h4 class="heading mt-4">{{ title }}</h4>
                <p>{{ text }}</p>
            </div>

            <template #footer>
                <base-button type="white" @click="confirm">Ok</base-button>
                <base-button v-if="!okOnly" type="whyte" text-color="white" class="ml-auto" @click="cancel">
                    Cancelar
                </base-button>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '~/plugins/modalAlert.js'

export default {
    data() {
        return {
            modal: false,
            title: '',
            text: '',
            type: 'primary',
            onConfirm: {},
            onCancel: {},
            okOnly: false,
        }
    },

    computed: {
        getIcon() {
            let icon = ''
            switch (this.type) {
                case 'success':
                    icon = 'ni ni-like-2 ni-3x'
                    break
                case 'error':
                    icon = 'fa fa-times fa-3x'
                    break
                case 'warning':
                    icon = 'fa fa-exclamation-circle fa-3x'
                    break
                case 'info':
                    icon = 'fa fa-info-circle fa-3x'
                    break
                default:
                    icon = ''
            }

            return icon
        },
    },
    beforeMount() {
        Modal.EventBus.$on('show', (params) => {
            this.show(params)
        })
    },
    methods: {
        showModal() {
            this.modal = true
        },
        closeModal() {
            this.modal = false
        },
        async confirm() {
            try {
                if (typeof this.onConfirm === typeof Function) {
                    await this.onConfirm()
                }
            } catch (error) {
                this.show({
                    title: 'Erro',
                    type: 'error',
                    text: error,
                })
            } finally {
                this.closeModal()
            }
        },
        async cancel() {
            try {
                if (typeof this.onCancel === typeof Function) {
                    await this.onCancel()
                }
            } catch (error) {
                this.show({
                    title: 'Erro',
                    type: 'error',
                    text: error,
                })
            } finally {
                this.closeModal()
            }
        },
        show(params) {
            // setting title and text
            this.title = params.title
            this.text = params.text

            // setting callback functions
            this.onConfirm = params.onConfirm
            this.onCancel = params.onCancel

            if (params.okOnly) {
                this.okOnly = true
            }

            if (params.type) {
                this.type = params.type
            }

            this.showModal()
        },
    },
}
</script>
