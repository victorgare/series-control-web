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
                            <base-nuxt-link block type="info" :to="makeRouteObject(episode.previousEpisode)"
                                >Anteior</base-nuxt-link
                            >
                        </div>
                        <div class="col-6 col-md-3 mb-3">
                            <base-nuxt-link block type="primary" :to="goToAnime">Detalhes</base-nuxt-link>
                        </div>
                        <div class="col-6 col-md-3 mb-3 d-flex justify-content-center">
                            <WatchedButton ref="watchedButton" :item="episode" />
                        </div>
                        <div class="col-6 col-md-3 mb-3">
                            <base-nuxt-link
                                v-if="episode.nextEpisode"
                                block
                                type="success"
                                :to="makeRouteObject(episode.nextEpisode)"
                                >Próximo</base-nuxt-link
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

import '~/plugins/videojs.persistvolume'
require('video.js/dist/video-js.css')
// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-seek-buttons/dist/videojs-seek-buttons.min.js')
require('videojs-seek-buttons/dist/videojs-seek-buttons.css')

export default {
    components: { WatchedButton },
    validate({ params, error }) {
        if (params.origemAnime && params.id) {
            return true
        }

        return error({ statusCode: 404, message: 'err message' })
    },
    data() {
        return {
            episodeId: '',
            origemAnime: '',
            episode: {},
            player: null,
            options: {
                autoplay: false,
                controls: true,
                responsive: true,
                userActions: {
                    hotkeys: true,
                },
                plugins: {
                    seekButtons: {
                        forward: 15,
                        back: 15,
                    },
                    persistvolume: {
                        namespace: 'So-Viral-So-Hot',
                    },
                },
            },

            timeUpdatedCheck: false,
            timeAlreadyWatchedSeted: false,
        }
    },
    computed: {
        mountUrlVideo() {
            return `${this.$config.BASE_ROUTE}${this.origemAnime}/watch/${encodeURIComponent(
                this.episode.urlVideo,
            )}?token=${encodeURIComponent(this.$auth.getToken('local'))}`
        },
        goToAnime() {
            return { name: 'Anime-id', params: { id: this.episode.animeId } }
        },
        isContinueWatching() {
            return this.$route.query.continueWatching === 'true'
        },
    },
    async mounted() {
        this.episodeId = this.$route.params.id
        this.origemAnime = this.$route.params.origemAnime

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

            this.player.on('ended', async () => {
                await this.$refs.watchedButton.handleWatched()
                this.goToEpisode(this.episode.nextEpisode, true)
            })

            this.player.on('error', async () => {
                await this.$axios.get('/ping')
            })
            this.player.on('timeupdate', this.timeUpdated)

            // loadedmetadata
            this.player.on('play', () => {
                if (this.timeAlreadyWatchedSeted === false) {
                    this.player.currentTime(this.episode.timeWatched)
                    this.timeAlreadyWatchedSeted = true
                }
            })

            this.player.on('progress', (teste) => {
                console.log(teste)
            })

            if (this.isContinueWatching) {
                this.player.play()
            }
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
        makeRouteObject(episode) {
            return { name: 'Anime-origemAnime-watch-id', params: { id: episode, origemAnime: this.origemAnime } }
        },
        goToEpisode(episode, continueWatching) {
            const routeObject = this.makeRouteObject(episode)

            if (continueWatching === true) {
                routeObject.query = {
                    continueWatching,
                }
            }

            this.$router.push(routeObject)
        },
    },
}
</script>
