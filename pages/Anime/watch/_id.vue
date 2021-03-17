<template>
    <div>
        <b-card tag="article" class="mb-2">
            <b-card-title>
                <b-skeleton-wrapper :loading="!episode.title">
                    <template #loading>
                        <b-skeleton width="85%"></b-skeleton>
                    </template>

                    <div v-html="episode.title" />
                </b-skeleton-wrapper>
            </b-card-title>
            <b-card-text>
                <b-row no-gutters>
                    <b-col sm="8" offset-sm="2" align-self="center">
                        <b-skeleton-wrapper :loading="!episode.urlVideo">
                            <template #loading>
                                <div>
                                    <b-skeleton-img card-img="center" />
                                </div>
                            </template>
                            {{ mountUrlVideo }}
                            <video ref="videoPlayer" class="video-js vjs-fluid m-auto w-auto mx-auto"> </video>
                        </b-skeleton-wrapper>
                    </b-col>
                </b-row>
                <b-skeleton-wrapper :loading="!episode.id">
                    <template #loading>
                        <div> <b-skeleton type="button" size="md"></b-skeleton> </div>
                    </template>
                    <div class="row mt-3">
                        <div class="col-3">
                            <base-button
                                v-if="episode.previousEpisode"
                                block
                                type="info"
                                @click="goToEpisode(episode.previousEpisode)"
                                >Anteior</base-button
                            >
                        </div>
                        <div class="col-3">
                            <base-button block type="primary" @click="goToAnime">Detalhes</base-button>
                        </div>
                        <div class="col-3 d-flex justify-content-center">
                            <WatchedButton ref="watchedButton" :item="episode" />
                        </div>
                        <div class="col-3">
                            <base-button
                                v-if="episode.nextEpisode"
                                block
                                type="success"
                                @click="goToEpisode(episode.nextEpisode)"
                                >Próximo</base-button
                            >
                        </div>
                    </div>
                </b-skeleton-wrapper>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
// import videojs from 'video.js'
import WatchedButton from '~/components/Series/WatchedButton'
require('video.js/dist/video-js.css')

export default {
    components: { WatchedButton },
    data() {
        return {
            episode: {},
            player: null,
            options: {
                autoplay: false,
                controls: true,
                responsive: true,
            },
        }
    },
    computed: {
        getUrlId() {
            return this.$route.params.id
        },
        mountUrlVideo() {
            return `${this.$config.BASE_ROUTE}episode/watch/${encodeURIComponent(
                this.episode.urlVideo,
            )}?token=${encodeURIComponent(this.$auth.getToken('local'))}`
        },
    },
    async mounted() {
        await this.getEpisode()

        // // this.options.sources.src = this.mountUrlVideo

        // const video = {
        //     type: 'video/mp4',
        //     src: this.mountUrlVideo,
        // }

        // this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
        //     this.src(video)
        // })

        // this.player.on('ended', () => {
        //     this.$refs.watchedButton.handleWatched()
        //     this.goToEpisode(this.episode.nextEpisode)
        // })

        // this.player.on('timeupdate', this.timeUpdated)
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    },
    methods: {
        async getEpisode() {
            try {
                const result = (await this.$axios.get(`/episode/${this.getUrlId}`)).data

                this.episode = result.data
            } catch (error) {
                this.$modalAlert.showError({
                    title: 'Erro',
                    text: error,
                })
            }
        },

        timeUpdated() {
            const currentTime = this.player.currentTime()
            const duration = this.player.duration()

            const porcentagem = (currentTime * 100) / duration

            if (porcentagem > 95) {
                // this.updateWatched()
            }
            console.log(porcentagem)
        },
        goToAnime() {
            this.$router.push({ name: 'Anime-id', params: { id: this.episode.animeId } })
        },
        goToEpisode(episode) {
            this.$router.push({ name: 'Anime-watch-id', params: { id: episode } })
        },
    },
}
</script>

<style scoped>
.teste {
    width: 950px;
    height: 500px;
}
</style>
