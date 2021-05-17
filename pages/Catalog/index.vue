<template>
    <div>
        <div class="row">
            <div class="col-xl-12 mb-5 mb-xl-0">
                <b-card-group deck>
                    <Catalog v-for="(catalogItem, index) in catalogItens" :key="index" :item="catalogItem" />
                </b-card-group>
            </div>
        </div>
    </div>
</template>

<script>
import Catalog from '~/components/Catalog/Catalog'

export default {
    components: { Catalog },

    data() {
        return {
            catalogItens: [],
        }
    },
    computed: {
        ownedItens() {
            return this.catalogItens.filter((item) => {
                return item.ownedByUser === true
            })
        },
        notOwnedItens() {
            return this.catalogItens.filter((item) => {
                return item.ownedByUser !== true
            })
        },
    },
    mounted() {
        this.getCatalog()
    },
    methods: {
        async getCatalog() {
            try {
                const result = (await this.$axios.get('anime/catalog')).data

                this.catalogItens = result.list.sort((item1, item2) => {
                    return item1.ownedByUser === item2.ownedByUser ? 0 : item2.ownedByUser ? -1 : 1
                })
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
