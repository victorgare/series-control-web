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
                            <!-- playsinline
                                class="video-js vjs-fluid m-auto w-auto mx-auto" -->
                            <video ref="videoPlayer" class="video-js vjs-fluid m-auto w-auto mx-auto">
                                <!-- <source :src="mountUrlVideo" type="video/mp4" /> -->
                            </video>
                        </b-skeleton-wrapper>
                    </b-col>
                </b-row>
                <b-skeleton-wrapper :loading="!episode.id">
                    <template #loading>
                        <div> <b-skeleton type="button" size="md"></b-skeleton> </div>
                    </template>
                    <div class="row mt-3">
                        <div v-if="episode.previousEpisode" class="col-6 col-md-3 mb-3">
                            <base-button block type="info" @click="goToEpisode(episode.previousEpisode)"
                                >Anteior</base-button
                            >
                        </div>
                        <div class="col-6 col-md-3 mb-3">
                            <base-button block type="primary" @click="goToAnime">Detalhes</base-button>
                        </div>
                        <div class="col-6 col-md-3 mb-3 d-flex justify-content-center">
                            <WatchedButton ref="watchedButton" :item="episode" />
                        </div>
                        <div class="col-6 col-md-3 mb-3">
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
import videojs from 'video.js'
import WatchedButton from '~/components/Series/WatchedButton'
require('video.js/dist/video-js.css')

export default {
    components: { WatchedButton },
    data() {
        return {
            episodeId: '',
            episode: {},
            player: null,
            options: {
                autoplay: false,
                controls: true,
                responsive: true,
            },
            timeUpdatedCheck: false,
        }
    },
    computed: {
        mountUrlVideo() {
            const url =
                'https://www.anitube.site/aHR0cHM6Ly9lbWFncmVjZXJwZXJkZW5kb2dvcmR1cmEuYmxvZ3Nwb3QuY29tLzIwMjAvMDcvMTQ4MjE0YWNkMzViNjgwOS5odG1s/0/bg.mp4'
            return `${this.$config.BASE_ROUTE}episode/watch/${encodeURIComponent(
                // this.episode.urlVideo,
                url,
            )}?token=${encodeURIComponent(this.$auth.getToken('local'))}`
        },
    },
    async mounted() {
        this.episodeId = this.$route.params.id

        await this.getEpisode()

        this.configPlayer()
    },
    beforeDestroy() {
        if (this.player) {
            const currentTime = this.player.currentTime()
            this.updateTimeWatched(currentTime)
            this.player.dispose()
        }
    },
    methods: {
        configPlayer() {
            const video = {
                type: 'video/mp4',
                src: this.mountUrlVideo,
            }

            this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
                this.src(video)
            })

            this.player.on('ended', () => {
                this.$refs.watchedButton.handleWatched()
                this.goToEpisode(this.episode.nextEpisode)
            })

            this.player.on('error', () => {
                this.$modalAlert.showError({
                    text: this.player.error(),
                })
            })
            this.player.on('timeupdate', this.timeUpdated)

            this.player.currentTime(this.episode.timeWatched)
        },
        async getEpisode() {
            try {
                const result = (await this.$axios.get(`/episode/${this.episodeId}`)).data

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

            const porcentagem = Math.trunc((currentTime * 100) / duration)

            if (porcentagem % 5 === 0) {
                // esse tratamento serve pra que enquanto a porcentagem nao virar para o proximo ponto percental
                // nao fique sobrecarregando o servidor
                if (this.timeUpdatedCheck === false) {
                    this.timeUpdatedCheck = true
                    this.updateTimeWatched(currentTime)
                }
            } else {
                this.timeUpdatedCheck = false
            }
        },
        async updateTimeWatched(timeWatched) {
            try {
                await this.$axios.post(`/episode/${this.episodeId}/updateTimeWatched`, {
                    TimeWatched: Math.trunc(timeWatched),
                })
            } catch (error) {}
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
