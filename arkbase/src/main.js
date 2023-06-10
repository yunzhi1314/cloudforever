import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 注册全局组件 通过component(组件名(该组件内的name属性),导入名)
import dialogPage from "@/components/dialogPage.vue"
import messagePage from "@/components/messagePage.vue"
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus).component('dialogPage',dialogPage).component("messagePage",messagePage).use(store).use(router).mount('#app')
