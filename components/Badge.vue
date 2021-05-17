<template>
    <component :is="tag" class="badge" :class="classes">
        <slot>
            <i v-if="icon" :class="icon"></i>
        </slot>
    </component>
</template>
<script>
export default {
    name: 'Badge',
    props: {
        tag: {
            type: String,
            default: 'span',
            description: 'Html tag to use for the badge.',
        },
        rounded: {
            type: Boolean,
            default: false,
            description: 'Whether badge is of pill type',
        },
        circle: {
            type: Boolean,
            default: false,
            description: 'Whether badge is circle',
        },
        icon: {
            type: String,
            default: '',
            description: 'Icon name. Will be overwritten by slot if slot is used',
        },
        type: {
            type: String,
            default: 'default',
            description: 'Badge type (primary|info|danger|default|warning|success)',
        },
        outline: {
            type: Boolean,
            default: false,
            description: 'Whether button style is outline',
        },
    },
    computed: {
        classes() {
            const badgeClasses = [
                { 'badge-pill': this.rounded },
                { 'badge-circle': this.circle },
                { [`text-${this.type}`]: this.type },
                this.type && !this.outline ? `badge-${this.type}` : '',
                this.outline ? `badge-outline` : '',
            ]

            return badgeClasses
        },
    },
}
</script>

<style scoped>
.badge-outline {
    border: 1px solid currentColor;
}
</style>
