<template>
    <div>
        <modal
            :show="modalAnitube"
            body-classes="p-0"
            modal-classes="modal-dialog-centered modal-sm"
            @close="closeModal"
        >
            <card
                type="secondary"
                shadow
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0"
            >
                <div class="text-center text-muted mb-4">
                    <small>Adicione a URl do anime</small>
                </div>
                <form role="form" @submit.prevent="cadastrar">
                    <base-input
                        v-model="url"
                        form-classes="input-group-alternative mb-3"
                        placeholder="Url"
                        addon-left-icon="fa fa-link"
                    >
                    </base-input>
                    <div class="text-center">
                        <base-button native-type="submit" type="primary" class="my-4">Cadastrar</base-button>
                    </div>
                </form>
            </card>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            modalAnitube: false,
            url: '',
        }
    },
    methods: {
        showModal() {
            this.modalAnitube = true
        },
        closeModal() {
            this.modalAnitube = false
        },

        async cadastrar() {
            try {
                await this.$axios.post('anitube/create', {
                    url: this.url,
                })

                this.$modalAlert.showSuccess({
                    title: 'Sucesso',
                    text: 'Cadastrado',
                    onConfirm: () => {
                        this.$nuxt.refresh()
                    },
                })
            } catch (error) {
                this.$modalAlert.showError({
                    title: 'Erro',
                    text: error,
                })
            }
        },
    },
}
</script>

<style></style>
