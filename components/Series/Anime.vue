<template>
    <div>
        <b-card tag="article" style="max-width: 20rem" class="mb-2">
            <b-card-title>
                <b-skeleton-wrapper :loading="!item.name">
                    <template #loading>
                        <b-skeleton width="85%"></b-skeleton>
                        <b-skeleton width="55%"></b-skeleton>
                        <b-skeleton width="70%"></b-skeleton>
                    </template>

                    <div v-html="item.name" />
                </b-skeleton-wrapper>
            </b-card-title>

            <b-card-text>
                <b-skeleton-wrapper :loading="!item.urlCapa">
                    <template #loading>
                        <div>
                            <b-skeleton-img card-img="top" aspect="3:1" />
                        </div>
                    </template>

                    <b-card-img height="335px" width="220px" :src="item.urlCapa" alt="Capa anime" :top="true" />
                </b-skeleton-wrapper>
                <!-- {{ item.name }} -->
            </b-card-text>

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
                            v-if="nextEpisode"
                            block
                            type="success"
                            :to="{ name: 'Anime-watch-id', params: { id: this.nextEpisode } }"
                            >Continuar Assistindo</base-nuxt-link
                        >
                    </div>
                </div>
            </b-skeleton-wrapper>
        </b-card>
    </div>
</template>

<script>
export default {
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
            nextEpisode: '',
        }
    },
    mounted() {
        this.getNextEpisode()
    },
    methods: {
        async getNextEpisode() {
            try {
                const result = (await this.$axios.get(`/anime/${this.item.id}/getUnwatchedEpisode`)).data

                this.nextEpisode = result.data
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
