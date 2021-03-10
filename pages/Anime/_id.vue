<template>
    <div>
        <!-- style="max-width: 20rem" -->
        <b-card tag="article" class="mb-2">
            <b-card-title>
                <b-skeleton-wrapper :loading="!anime.name">
                    <template #loading>
                        <b-skeleton width="85%"></b-skeleton>
                    </template>

                    <div v-html="anime.name" />
                </b-skeleton-wrapper>
            </b-card-title>
            <b-card-text>
                <b-row no-gutters>
                    <b-col xl="2" sm="12" class="ml-sm-auto" align-self="center">
                        <b-skeleton-wrapper :loading="!anime.urlCapa">
                            <template #loading>
                                <div>
                                    <b-skeleton-img card-img="left" height="335px" width="220px" />
                                </div>
                            </template>

                            <b-card-img
                                class="d-sm-flex mx-sm-auto"
                                height="335px"
                                width="220px"
                                :src="anime.urlCapa"
                                alt="Capa anime"
                                left
                            />
                        </b-skeleton-wrapper>
                    </b-col>
                    <b-col>
                        <b-skeleton-wrapper :loading="!anime.sinopse">
                            <template #loading>
                                <div>
                                    <b-skeleton width="85%"></b-skeleton>
                                    <b-skeleton width="55%"></b-skeleton>
                                    <b-skeleton width="70%"></b-skeleton>
                                    <b-skeleton width="85%"></b-skeleton>
                                    <b-skeleton width="55%"></b-skeleton>
                                    <b-skeleton width="70%"></b-skeleton>
                                </div>
                            </template>

                            <small>
                                {{ anime.sinopse }}
                            </small>
                        </b-skeleton-wrapper>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>

        <b-card no-body>
            <b-card-header v-b-toggle.accordion-1 header-tag="header" href="#" role="tab">
                <h5 class="mb-0">Episódios</h5>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <Episode v-for="(episode, index) of episodes" :key="index" :item="episode" />
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
import Episode from '~/components/Series/Episode'
export default {
    components: {
        Episode,
    },
    data() {
        return {
            anime: {},
            episodes: [],
        }
    },
    computed: {
        getUrlId() {
            return this.$route.params.id
        },
    },
    mounted() {
        this.getAnime()
        this.getEpisodes()
    },
    methods: {
        async getAnime() {
            try {
                const result = (await this.$axios.get(`/anime/${this.getUrlId}`)).data

                this.anime = result.data
            } catch (error) {
                this.$modalAlert.showError({
                    title: 'Erro',
                    text: error,
                })
            }
        },
        async getEpisodes() {
            try {
                const result = (await this.$axios.get(`/anime/${this.getUrlId}/episodes`)).data

                this.episodes = result.list
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
