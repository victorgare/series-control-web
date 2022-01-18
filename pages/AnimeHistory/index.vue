<template>
    <div>
        <div class="row">
            <div class="col-xl-12 mb-5 mb-xl-0">
                <b-card-group deck>
                    <div v-for="(animeHistoryItem, index) in animeHistoryItens" :key="index">
                        <b-card tag="article" style="max-width: 20rem" class="mb-2">
                            <BaseAnime :item="animeHistoryItem" />
                            <b-skeleton-wrapper :loading="!animeHistoryItem.id">
                                <template #loading>
                                    <div> <b-skeleton type="button" size="md"></b-skeleton> </div>
                                </template>
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <base-nuxt-link
                                            block
                                            type="info"
                                            :to="{ name: 'Anime-id', params: { id: animeHistoryItem.id } }"
                                            >Detalhes</base-nuxt-link
                                        >
                                    </div>
                                </div>
                            </b-skeleton-wrapper>
                        </b-card>
                    </div>
                </b-card-group>
            </div>
        </div>
    </div>
</template>
<script>
import BaseAnime from '~/components/Series/BaseAnime'
export default {
    components: { BaseAnime },
    data() {
        return {
            animeHistoryItens: [],
        }
    },
    mounted() {
        this.getHistory()
    },
    methods: {
        async getHistory() {
            try {
                this.animeHistoryItens = (await this.$axios.get('anime/getUserAnimesHistory')).data.list
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
