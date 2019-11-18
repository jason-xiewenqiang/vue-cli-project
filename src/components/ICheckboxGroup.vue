<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
import Emitter from '../mixins/emitter'
import {findComponentsDownward} from '../utils/findComponentsDownward'
import Emitter from '../mixins/emitter'
export default {
    name: 'i-checkbox-group',
    mixins: [Emitter ],
    props: {
        value: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return { 
            currentValue: this.value,
            childrens: []
        }
    },
    mounted() {
        this.updateModel(true)
    },
    watch: {
        value () {
            this.updateModel(true)
        }
    },
    methods: {
        updateModel(update) {
            this.currentValue = update
            this.childrens = findComponentsDownward(this, 'i-checkbox')
            if (this.childrens) {
                const {value} = this
                this.childrens.forEach(child => {
                    child.model = value
                    if (update) {
                        child.currentValue = value.indexOf(child.label) >= 0
                        child.group = true
                    }
                })
            }
        },
        change(data) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('on-change', data)
            this.dispatch('i-form-iem', 'on-form-change', data)
        }
    },
}
</script>
<style scoped>

</style>