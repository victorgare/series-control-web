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
                        <base-button
                            :disabled="item.ownedByUser === true"
                            block
                            icon
                            type="success"
                            @click="handleWatched"
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
}
</script>
