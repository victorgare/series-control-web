<template>
    <div>
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
                <b-row>
                    <b-col>
                        <div class="progress-wrapper">
                            <b-skeleton-wrapper :loading="episodes.length <= 0">
                                <template #loading>
                                    <b-skeleton width="100%"></b-skeleton>
                                </template>

                                <base-progress
                                    type="success"
                                    :label="progressLabel"
                                    show-label="true"
                                    :height="10"
                                    :value="percentageWatched"
                                    size="lg"
                                >
                                    <slot label> da </slot>
                                </base-progress>
                            </b-skeleton-wrapper>
                        </div>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>

        <b-card no-body class="mb-2">
            <b-card-header v-b-toggle.assistir header-tag="header" href="#" role="tab">
                <h5 class="mb-0"
                    >Episódios Assistir
                    <span class="text-success">●</span>
                </h5>
            </b-card-header>
            <b-collapse id="assistir" visible accordion="assistir" role="tabpanel">
                <Episode
                    v-for="episode of getEpisodesUnwatched"
                    :ref="episode.id"
                    :key="episode.id"
                    :item="episode"
                    :origem-anime="anime.origemAnime"
                    @afterHandledWatched="handlePreviousEpisodes"
                />
            </b-collapse>
        </b-card>

        <b-card no-body>
            <b-card-header v-b-toggle.assistidos header-tag="header" href="#" role="tab">
                <h5 class="mb-0"
                    >Episódios Assistidos
                    <span class="text-danger">●</span>
                </h5>
            </b-card-header>
            <b-collapse id="assistidos" visible accordion="assistidos" role="tabpanel">
                <Episode v-for="episode of getEpisodesWatched" :key="episode.id" :item="episode" />
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
        totalEpisodes() {
            return this.episodes.length
        },
        progressLabel() {
            return `${this.totalWatched}/${this.totalEpisodes}`
        },
        getEpisodesWatched() {
            return this.episodes.filter((item) => {
                return item.watched === true
            })
        },
        getEpisodesUnwatched() {
            return this.episodes.filter((item) => {
                return item.watched === false
            })
        },
        totalWatched() {
            return this.getEpisodesWatched.length
        },
        percentageWatched() {
            const porcentagem = (this.totalWatched * 100) / this.totalEpisodes
            return isNaN(porcentagem) ? 0 : parseFloat(porcentagem.toFixed(2))
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
        handlePreviousEpisodes(obj) {
            const indexEpisode = this.episodes.findIndex((item) => {
                return item.id === obj
            })

            const episodesToHandleWatched = []
            for (let index = 0; index < indexEpisode; index++) {
                const episode = this.episodes[index]

                if (episode.watched !== true) {
                    episodesToHandleWatched.push(episode.id)
                }
            }

            if (episodesToHandleWatched.length > 0) {
                this.$modalAlert.showInfo({
                    title: 'Marcar episódios',
                    text: `Existem ${episodesToHandleWatched.length} episódios anteriores que não estão marcados como assistidos, gostaria de marca-los?`,
                    onConfirm: async () => {
                        for (const episodeToHandle of episodesToHandleWatched) {
                            await this.$refs[episodeToHandle][0].$refs.watchedButton.handleWatched()
                        }
                    },
                })
            }
        },
    },
}
</script>

<style></style>
