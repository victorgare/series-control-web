<template>
    <div>
        <label class="h4 text-white text-uppercase d-none d-lg-inline-block">Continue Assistindo</label>
        <b-card-group deck>
            <Anime
                v-for="(anime, index) in watching"
                :key="index"
                :item="anime.anime"
                :next-episode="anime.nextEpisode"
            />
        </b-card-group>

        <hr class="border-white" />

        <label class="h4 text-white text-uppercase d-none d-lg-inline-block">Assistir novamente</label>
        <b-card-group deck>
            <Anime
                v-for="(anime, index) in watched"
                :key="index"
                :item="anime.anime"
                :next-episode="anime.nextEpisode"
            />
        </b-card-group>
    </div>
</template>

<script>
import Anime from '~/components/Series/Anime'

export default {
    components: { Anime },
    data() {
        return {
            animes: [],
        }
    },
    computed: {
        watching() {
            return this.animes.filter((item) => {
                return item.nextEpisode && item.nextEpisode !== ''
            })
        },
        watched() {
            return this.animes.filter((item) => {
                return !item.nextEpisode || item.nextEpisode === ''
            })
        },
    },
    async mounted() {
        await this.getAnimes()
    },
    methods: {
        async getAnimes() {
            try {
                const result = (await this.$axios.get('anime/getUserAnimes')).data

                this.animes = result.list
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
