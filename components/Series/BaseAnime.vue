<template>
    <div class="mb-3">
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
            <b-skeleton-wrapper v-if="item.episodesQuantity !== undefined" :loading="!item.urlCapa">
                <template #loading>
                    <div>
                        <b-skeleton></b-skeleton>
                        <b-skeleton></b-skeleton>
                    </div>
                </template>

                <badge pill type="primary">{{ item.episodesQuantity }} episódios</badge>
                <badge v-if="item.ownedByUser === true" outline type="success">Já assistindo</badge>
                <badge v-else outline type="danger">Não iniciado</badge>
            </b-skeleton-wrapper>
            <badge pill type="info">{{ item.origemAnime }}</badge>
        </b-card-text>
        <b-card-text>
            <b-skeleton-wrapper :loading="!item.urlCapa">
                <template #loading>
                    <div>
                        <b-skeleton-img card-img="top" aspect="3:1" />
                    </div>
                </template>

                <b-card-img height="335px" width="220px" :src="item.urlCapa" alt="Capa anime" :top="true" />
            </b-skeleton-wrapper>
        </b-card-text>
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
}
</script>
