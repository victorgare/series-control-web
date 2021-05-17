<template>
    <div>
        <b-card tag="article" style="max-width: 20rem" class="mb-2">
            <BaseAnime :item="item" />

            <b-skeleton-wrapper :loading="!internItem.id">
                <template #loading>
                    <div> <b-skeleton type="button" size="md"></b-skeleton> </div>
                </template>
                <div class="row">
                    <div class="col-12 mb-3">
                        <base-nuxt-link block type="info" :to="{ name: 'Anime-id', params: { id: item.id } }"
                            >Detalhes</base-nuxt-link
                        >
                    </div>
                    <div class="col-12">
                        <base-button
                            :loading="loadingAddToUser"
                            :disabled="internItem.ownedByUser === true"
                            block
                            icon
                            type="success"
                            @click="addToUser"
                        >
                            Adicionar
                        </base-button>
                    </div>
                </div>
            </b-skeleton-wrapper>
        </b-card>
    </div>
</template>

<script>
import BaseAnime from '~/components/Series/BaseAnime'
export default {
    components: { BaseAnime },
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            loadingAddToUser: false,
            internItem: this.item,
        }
    },
    methods: {
        async addToUser() {
            this.loadingAddToUser = true
            try {
                await this.$axios.post('anitube/create', {
                    id: this.internItem.id,
                })

                this.internItem.ownedByUser = true
                this.$modalAlert.showSuccess({
                    title: 'Sucesso',
                    text: 'Cadastrado',
                })
            } catch (error) {
                this.$modalAlert.showError({
                    title: 'Erro',
                    text: error,
                })
            } finally {
                this.loadingAddToUser = false
            }
        },
    },
}
</script>
