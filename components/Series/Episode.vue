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
                    <base-button icon :type="getTypeBotaoAssistido" @click="handleWatched">
                        <span class="btn-inner--icon">
                            <i class="fa fa-eye" :class="{ 'fa-eye': !watched, 'fa-eye-slash': watched }"> </i>
                        </span>
                    </base-button>
                    <base-button icon type="success">
                        <span class="btn-inner--icon"><i class="ni ni-button-play"></i></span>
                    </base-button>
                </b-col>
            </b-row>
        </card>
    </div>
</template>

<script>
export default {
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
        getTypeBotaoAssistido() {
            return this.watched ? 'danger' : 'primary'
        },
        watched() {
            return this.internItem.watched === true
        },
    },
    methods: {
        async handleWatched() {
            try {
                const result = (await this.$axios.get(`/episode/handleWatched/${this.internItem.id}`)).data
                if (result.sucesso === true) {
                    this.internItem.watched = result.data
                }
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
