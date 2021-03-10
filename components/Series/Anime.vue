<template>
    <div>
        <!-- title="Card Title"
        :img-src="item.urlCapa" 
        img-alt="Capa anime"
            img-top-->

        <b-card tag="article" style="max-width: 20rem" class="mb-2">
            <b-card-title>
                <b-skeleton-wrapper :loading="!item.name">
                    <template #loading>
                        <b-skeleton width="85%"></b-skeleton>
                        <b-skeleton width="55%"></b-skeleton>
                        <b-skeleton width="70%"></b-skeleton>
                    </template>

                    <div v-html="item.name" />
                </b-skeleton-wrapper>
            </b-card-title>

            <b-card-text>
                <b-skeleton-wrapper :loading="!item.urlCapa">
                    <template #loading>
                        <div>
                            <b-skeleton-img card-img="top" aspect="3:1" />
                        </div>
                    </template>

                    <b-card-img height="335px" width="220px" :src="item.urlCapa" alt="Capa anime" :top="true" />
                </b-skeleton-wrapper>
                <!-- {{ item.name }} -->
            </b-card-text>

            <b-skeleton-wrapper :loading="!item.id">
                <template #loading>
                    <div> <b-skeleton type="button" size="md"></b-skeleton> </div>
                </template>
                <div class="row">
                    <div class="col-6 mb-3">
                        <base-button block type="info" @click="goToAnimeDetails">Detalhes</base-button>
                    </div>
                    <div class="col-6 mb-3">
                        <base-button block type="primary">Assistido</base-button>
                    </div>
                    <div class="col-12">
                        <base-button block type="success">Continuar Assistindo</base-button>
                    </div>
                </div>
            </b-skeleton-wrapper>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    methods: {
        goToAnimeDetails() {
            this.$router.push({ name: 'Anime-id', params: { id: this.item.id } })
        },
    },
}
</script>

<style></style>
