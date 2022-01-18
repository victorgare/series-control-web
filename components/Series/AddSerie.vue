<template>
    <!-- position-fiex -->
    <div class="position-fixed m-3 mb-5">
        <base-dropdown tag="div" class="" direction="up" position="right">
            <template #title>
                <base-button type="primary" size="lg" :rounded="true" icon="fa fa-plus"></base-button>
            </template>
            <a class="dropdown-item" @click.prevent="adicionarAnitube">
                <img
                    src="https://www.anitube.site/wp-content/uploads/cropped-Favicon6-32x32.png"
                    class="fav-icon-size"
                />
                Anitube
            </a>
        </base-dropdown>
        <ModalAnitube ref="modalAnitube" class="dropdown-item" />
    </div>
</template>

<script>
import ModalAnitube from '~/components/Series/ModalAnitube'
export default {
    components: {
        ModalAnitube,
    },
    methods: {
        adicionarAnitube() {
            this.$refs.modalAnitube.showModal()
        },
        adicionarGoyabu() {
            this.$refs.modalGoyabu.showModal()
        },
    },
}
</script>

<style scoped>
.position-fixed {
    bottom: 0;
    right: 0;
}

.fav-icon-size {
    height: 32px;
    width: 32px;
    /* Other styles here */
}
</style>
