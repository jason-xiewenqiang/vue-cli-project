<template>
    <div>
        <i-tree-node 
            v-for='(node, index) in cloneData'
            :key='index'
            :data='node'
            :showCheckbox='showCheckbox'
            ></i-tree-node>
    </div>
</template>
<script>
import {deepCopy} from '../utils/deepCopy'
import ITreeNode from './ITreeNode'
export default {
    name: 'i-tree',
    components: {ITreeNode},
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            cloneData: []
        }
    },
    created() {
        this.rebuildData()
    },
    watch: {
        data() {
            this.rebuildData()
        }
    },
    methods: {
        rebuildData() {
            this.cloneData = deepCopy(this.data)
        },
        emitEvent (eventName, data) {
            this.$emit(eventName, data, this.cloneData)
        }
    },
}
</script>