<template>
    <base-button icon :type="getTypeBotaoAssistido" @click="handleWatched">
        <span class="btn-inner--icon">
            <i class="fa fa-eye" :class="{ 'fa-eye': !watched, 'fa-eye-slash': watched }"> </i>
        </span>
    </base-button>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            internItem: this.item,
        }
    },

    computed: {
        getTypeBotaoAssistido() {
            return this.watched ? 'danger' : 'primary'
        },
        watched() {
            return this.internItem.watched === true
        },
    },
    methods: {
        async handleWatched() {
            try {
                const result = (
                    await this.$axios.post(`/episode/handleWatched`, {
                        id: this.internItem.id,
                    })
                ).data
                if (result.sucesso === true) {
                    this.internItem.watched = result.data
                }
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
