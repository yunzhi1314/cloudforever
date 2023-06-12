import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dialogPage from './component/dialogPage.vue'//遮罩组件
import messagePage from './component/messagePage.vue'//吐丝组件
// 引入element-plus
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for(const[key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

app.use(ElementPlus).component('dialogPage',dialogPage).component('messagePage',messagePage).use(store).use(router).mount('#app')
