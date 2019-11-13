<template>
    <div class=''>
        <label v-if='label' :class="{'i-form-item-label-required': isRequired}">{{ label }}</label>
        <div>
            <slot></slot>
            <div v-if='validateStatus === "error"' class='i-form-item-message'>{{ validateMessage }}</div>
        </div>
    </div>
</template>
<script>
import Emitter from '../mixins/emitter'
import AsyncValidator from 'async-validator'
export default {
    name: 'i-form-item',
    mixins: [ Emitter ],
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String
        }
    },
    data () {
        return {
            validateStatus: '',
            validateMessage: '',
            isRequired: false
        }
    },
    mounted () {
        if (this.prop) {
            this.dispatch('i-form', 'on-form-item-add', this)
            this.initialValue = this.fieldValue;
            this.setRules()
        }
    },
    computed: {
        fieldValue () {
            return this.form.model[this.prop]
        }
    },
    methods: {
        setRules () {
            let rules = this.getRules()
            if (rules.length) {
                rules.every(rule => {
                    this.isRequired = rule.required
                })
            }

            this.$on('on-form-blur', this.onFieldBlur)
            this.$on('on-form-change', this.onFieldChange)
        },
        getRules () {
            let formRules = this.form.rules
            formRules = formRules ? formRules[this.prop] : []
            return [].concat(formRules || [])
        },
        getFilteredRule (trigger) {
            const rules = this.getRules()
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
        },
        onFieldBlur () {
            this.validate('blur')
        },
        onFieldChange () {
            this.validate('change')
        },
        validate (trigger, callback = () => {}) {
            let rules = this.getFilteredRule(trigger)
            if (!rules || rules.length === 0) {
                return true
            }
            this.validateStatus = 'validating'
            let descriptor = {}
            descriptor[this.prop] = rules
            const validator = new AsyncValidator(descriptor)
            let model = {}
            model[this.prop] = this.fieldValue
            validator.validate(model, {firstFields: true}, error => {
                this.validateStatus = !error ? 'success' : 'error'
                this.validateMessage = error ? error[0].message : ''
                callback(this.validateMessage)
            })
        },
        resetField () {
            this.validateState = ''
            this.validateMessage = ''

            this.form.model[this.prop] = this.initialValue
        }
    },
    beforeDestroy () {
        this.dispatch('i-form', 'on-form-item-remove', this)
    }
}
</script>
<style>
    .i-form-item-label-required:before {
        content: '*';
        color: red;
    }
    .i-form-item-message {
        color: red;
    }
</style>