var CMain = Vue.component('c-main', {
    template: `
        <div class='c-view'>
            c-main
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