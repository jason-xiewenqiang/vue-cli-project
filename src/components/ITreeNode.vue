<template>
    <ul class='tree-ul'>
        <li class='tree-li'>
            <span class='tree-expand' @click='expandHandle'>
                <span v-if='data.children && data.children.length && !data.expand'>+</span>
                <span v-if='data.children && data.children.length && data.expand'>-</span>
            </span>
            <i-checkbox
                v-if="showCheckbox"
                :value="data.checked"
                @input="handleCheck"
            ></i-checkbox>
            <span>{{ data.title }}</span>
            <template v-if='data.expand'>
                <i-tree-node
                    v-for='(item, index) in data.children'
                    :key='index'
                    :data='item'
                    :showCheckbox='showCheckbox'
                ></i-tree-node>
            </template>
        </li>
    </ul>  
</template>
<script>
import ICheckbox from './ICheckbox'
import { findComponentUpward } from '../utils/findComponentUpward'          
export default {
    name: 'i-tree-node',
    components: {ICheckbox},
    props: {
        data: {
            type: Object,
            default() {
                return {}
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tree: findComponentUpward(this, 'i-tree')
        }
    },
    watch: {
        'data.children': {
            handler (data) {
                if (data) {
                    const checkedAll = !data.some(item => !item.checked);
                    this.$set(this.data, 'checked', checkedAll);
                }
            },
            deep: true
        }
    },
    methods: {
        expandHandle() {
            this.$set(this.data, 'expand', !this.data.expand)
            if (this.tree) {
                this.tree.emitEvent('on-toggle-expand', this.data)
            }
        },
        handleCheck (checked) {
            this.updateTreeDown(this.data, checked)
            if (this.tree) {
                this.tree.emitEvent('on-check-change', this.data)
            }
        },
        updateTreeDown (data, checked) {
            this.$set(data, 'checked', checked)

            if (data.children && data.children.length) {
                data.children.forEach(item => {
                    this.updateTreeDown(item, checked)
                })
            }
        }
    },
}
</script>
<style>
    .tree-ul, .tree-li{
        list-style: none;
        padding-left: 10px;
    }
    .tree-expand{
        cursor: pointer;
    }
</style>