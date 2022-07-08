import { createApp } from 'vue'
import App from './App.vue'

// 引入 ui 框架
import Antd from 'ant-design-vue'
// import './assets/icon/iconfont.css'
import 'ant-design-vue/dist/antd.less'
import './styles/base.less'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const app = createApp(App)

import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3017944_l8ypc9406af.js',
})

// const app = createApp(App)
app.component('IconFont', IconFont)
// 引入轻量级状态管理库

const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
// 挂载路由
// 配置 router 导入
import router from '@/router'

app.use(router)

app.use(Antd)

app.mount('#app')
