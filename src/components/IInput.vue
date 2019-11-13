<template>
    <input
        type='text'
        :vlaue='currentValue'
        @input='handleInput'
        @blur='handleBlur'
    />
</template>
<script>
import Emitter from '../mixins/emitter'
export default {
    name: 'i-input',
    mixins: [ Emitter ],
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value (val) {
            this.currentValue = val
        } 
    },
    methods: {
        handleInput (event) {
            const value = event.target.value
            this.currentValue = value
            this.$emit('input', value)
            this.dispatch('i-form-item', 'on-form-change', value)
        },
        handleBlur () {
            this.dispatch('i-form-item', 'on-form-blur', this.currentValue)
        }
    },
}
</script>
<style scoped>

</style>