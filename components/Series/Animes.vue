<template>
    <div>
        <Anime v-for="(anime, index) in animes" :key="index" :item="anime" />
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
    async mounted() {
        await this.getAnimes()
    },
    methods: {
        async getAnimes() {
            try {
                const result = (await this.$axios.get('anime/getAnimes')).data

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
