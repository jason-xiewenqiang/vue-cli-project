console.log('form-create')
Vue.component('form-create',{
    props: ['data'],
    template: `
    <div class="form-create">
        hello
    </div>
    `,
    watch: {
        data(val) {
            console.log('传入参数', val)
        }
    },
    mounted() {
        // 初始化
        console.log('form init', this.data)
    }

})