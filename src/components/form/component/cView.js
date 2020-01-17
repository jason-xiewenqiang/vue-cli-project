var CView = Vue.component('c-view', {
    template: `
        <div class='c-view'>
            <el-button @click="handDrawer" type="primary" style="margin-left: 16px;">
                点我打开
            </el-button>
        </div>
    `,
    methods: {
        handDrawer() {
            this.$emit('open', true)
        }
    }
});