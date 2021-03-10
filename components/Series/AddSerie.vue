<template>
    <!-- position-fiex -->
    <div class="position-fixed m-3 mb-5">
        <base-dropdown tag="div" class="" direction="up" position="right">
            <template #title>
                <base-button type="primary" size="lg" :rounded="true" icon="fa fa-plus"></base-button>
            </template>
            <a class="dropdown-item" @click.prevent="adicionarAnitube">
                <img src="https://www.anitube.site/wp-content/uploads/cropped-Favicon6-32x32.png" />
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
    },
}
</script>

<style scoped>
.position-fixed {
    bottom: 0;
    right: 0;
}

.anitube-icon {
    display: inline-block;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: url('https://www.anitube.site/wp-content/uploads/cropped-Favicon6-32x32.png');
    height: 32px;
    width: 32px;
    /* Other styles here */
}
</style>
