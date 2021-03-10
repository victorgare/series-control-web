<template>
    <div>
        <card>
            <!-- Card body -->
            <b-row align-v="center">
                <b-col class="ml-4">
                    <h4 class="mb-0">
                        <a href="javascript:;">{{ internItem.episodeNumber }} - {{ internItem.description }}</a>
                    </h4>
                    <p class="text-sm text-muted mb-0">{{ internItem.name }}</p>
                    <span :class="{ 'text-success': watched, 'text-danger': !watched }">●</span>
                    <small>Assistido</small>
                </b-col>
                <b-col md="auto">
                    <WatchedButton :item="internItem" />
                    <base-button icon type="success" @click="watch">
                        <span class="btn-inner--icon"><i class="ni ni-button-play"></i></span>
                    </base-button>
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
    },

    methods: {
        watch() {
            this.$router.push({ name: 'Anime-watch-id', params: { id: this.internItem.id } })
        },
    },
}
</script>

<style></style>
