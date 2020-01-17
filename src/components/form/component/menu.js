console.log('menu')

Vue.component('c-menu',{
    props: ['data'],
    template: `
        <div class="menu">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <router-link to='/c-view'>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">view</span>
                    </el-menu-item>
                </router-link>
                <router-link to='/c-main'>
                    <el-menu-item index="3">
                        <i class="el-icon-menu"></i>
                        <span slot="title">main</span>
                    </el-menu-item>
                </router-link>
             </el-menu>
        </div>
    `,
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          }
    }
})