<template>
    <div>
        <card>
            <!-- Card body -->
            <b-row align-v="center">
                <b-col class="ml-4">
                    <h4 class="mb-0">
                        <base-nuxt-link type="" :to="watch"
                            >{{ internItem.episodeNumber }} - {{ internItem.description }}</base-nuxt-link
                        >
                    </h4>
                    <p class="text-sm text-muted mb-0">{{ internItem.name }}</p>
                    <span :class="{ 'text-success': watched, 'text-danger': !watched }">●</span>
                    <small>Assistido</small>
                </b-col>
                <b-col md="auto">
                    <WatchedButton ref="watchedButton" :item="internItem" @afterHandledWatched="afterHandledWatched" />
                    <base-nuxt-link icon type="success" :to="watch">
                        <span class="btn-inner--icon"><i class="ni ni-button-play"></i></span>
                    </base-nuxt-link>
                </b-col>
            </b-row>
        </card>
    </div>
</template>

<script>
import WatchedButton from '~/components/Series/WatchedButton'
export default {
    components: { WatchedButton },
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        origemAnime: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            internItem: this.item,
        }
    },
    computed: {
        watched() {
            return this.internItem.watched === true
        },
        watch() {
            return {
                name: 'Anime-origemAnime-watch-id',
                params: { id: this.internItem.id, origemAnime: this.origemAnime },
            }
        },
    },
    methods: {
        afterHandledWatched() {
            this.$emit('afterHandledWatched', this.internItem.id)
        },
    },
}
</script>

<style></style>
