<template>
    <div>
        <b-card tag="article" style="max-width: 20rem" class="mb-2">
            <BaseAnime :item="item" />
            <b-skeleton-wrapper :loading="!item.id">
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
                        <base-nuxt-link
                            :disabled="nextEpisode === ''"
                            block
                            type="success"
                            :to="{
                                name: 'Anime-origemAnime-watch-id',
                                params: { id: nextEpisode, origemAnime: item.origemAnime },
                            }"
                            >Continuar Assistindo</base-nuxt-link
                        >
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
        nextEpisode: {
            type: String,
            default: '',
            description: 'Id do próximo episódio',
        },
    },
}
</script>

<style></style>
