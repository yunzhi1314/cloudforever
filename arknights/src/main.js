import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册全局组件
import dialogPage from './components/dialogPage.vue'//遮罩组件
import messagePage from './components/messagePage.vue'//吐丝组件

// 引入element组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}




app.use(ElementPlus).component('dialogPage',dialogPage).component('messagePage',messagePage).
use(store).use(router).mount('#app')

