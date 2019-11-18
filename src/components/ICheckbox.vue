<template>
    <label>
        <span>
            <input v-if='group' 
                type="checkbox" 
                :disabled='disabled'
                @change='change'
                v-model='model'
                :checked='currentValue'
            />
            <input v-else 
                type="checkbox"
                :disabled='disabled'
                :checked='currentValue'
                @change='change'
            />
        </span>
        <slot></slot>
    </label>
</template>
<script>
import Emitter from '../mixins/emitter'
import { findComponentUpward } from '../utils/findComponentUpward'
export default {
    name: 'i-checkbox',
    mixins: [Emitter],
    props: {
        label: {
            type: [String, Boolean, Number]
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Boolean, String, Number],
            default: true
        },
        trueValue: {
            type: [Boolean, String, Number],
            default: true
        },
        falseValue: {
            type: [Boolean, String, Number],
            default: false
        }
    },
    data() {
        return {
            currentValue: this.value,
            model: [],
            group: false,
            parent: null
        }
    },
    mounted() {
        this.parent = findComponentUpward(this, 'i-checkbox-group')
        if (this.parent) {
            this.group = true
        }
        if (this.group) {
            this.parent.updateModel(true)
        } else {
            this.updateModel()
        }
    },
    watch: {
        value(val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateModel()
            } else {
                throw 'Value should be trueValue or falseValue'
            }
        }
    },
    methods: {
        updateModel() {
            this.currentValue = this.value === this.trueValue
        },
        change(event) {
            if (this.disabled) {
                return false
            }
            const checked = event.target.checked
            this.currentValue = checked
            const value = checked ? this.trueValue : this.falseValue

            this.$emit('input', value)
            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('on-change', value)
                this.dispatch('i-checkbox-group', 'on-checkbox-change', value)
            }
        }
    },
}
</script>
<style scoped>
    label {
        user-select: none;
    }
</style>