<template>
    <nuxt-link :to="to" :class="classes" @click="handleClick">
        <span v-if="($slots.icon || (icon && $slots.default)) && !loading" class="btn-inner--icon">
            <slot name="icon">
                <i :class="icon"></i>
            </slot>
        </span>
        <i v-if="!$slots.default && !loading" :class="icon"></i>
        <span v-if="($slots.icon || (icon && $slots.default)) && !loading" class="btn-inner--text">
            <slot>
                {{ text }}
            </slot>
        </span>
        <slot v-if="!$slots.icon && !icon && !loading"></slot>
        <div v-if="loading" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </nuxt-link>
</template>
<script>
export default {
    name: 'BaseNuxtLink',
    props: {
        to: {
            type: Object,
            default: () => {},
            description: 'Default route',
        },

        type: {
            type: String,
            default: 'default',
            description: 'Button type (e,g primary, danger etc)',
        },
        size: {
            type: String,
            default: '',
            description: 'Button size lg|sm',
        },
        textColor: {
            type: String,
            default: '',
            description: 'Button text color (e.g primary, danger etc)',
        },
        icon: {
            type: String,
            default: '',
            description: 'Button icon',
        },
        text: {
            type: String,
            default: '',
            description: 'Button text in case not provided via default slot',
        },
        outline: {
            type: Boolean,
            default: false,
            description: 'Whether button style is outline',
        },
        rounded: {
            type: Boolean,
            default: false,
            description: 'Whether button style is rounded',
        },
        iconOnly: {
            type: Boolean,
            default: false,
            description: 'Whether button contains only an icon',
        },
        block: {
            type: Boolean,
            default: false,
            description: 'Whether button is of block type',
        },
        disabled: {
            type: Boolean,
            default: false,
            description: 'If the anchor is disabled',
        },
        loading: {
            type: Boolean,
            default: false,
            description: 'If the button is waiting for something',
        },
    },
    computed: {
        classes() {
            const btnClasses = [
                { btn: this.type !== '' },
                { 'btn-block': this.block },
                { 'rounded-circle': this.rounded },
                { 'btn-icon-only': this.iconOnly },
                { [`text-${this.textColor}`]: this.textColor },
                { 'btn-icon': this.icon || this.$slots.icon },
                this.type && !this.outline ? `btn-${this.type}` : '',
                this.outline ? `btn-outline-${this.type}` : '',
            ]
            if (this.size) {
                btnClasses.push(`btn-${this.size}`)
            }
            if (this.disabled) {
                btnClasses.push('disabled')
            }
            return btnClasses
        },
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt)
        },
    },
}
</script>
