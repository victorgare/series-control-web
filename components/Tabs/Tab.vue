<template>
    <div v-show="active" :id="id || title" class="tab-pane" :class="{ active: active }">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'TabPane',
    inject: ['addTab', 'removeTab'],
    props: {
        title: {
            type: String,
            default: '',
            description: 'Tab pane title',
        },
        id: {
            type: String,
            default: null,
            description: 'Tab pane id',
        },
    },
    data() {
        return {
            active: false,
        }
    },
    mounted() {
        this.addTab(this)
    },
    unmounted() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.removeTab(this)
    },
}
</script>
