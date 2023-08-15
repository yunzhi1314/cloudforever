import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import messagePage from '@/components/messagePage.vue'
import dialogPage from '@/components/dialogPage.vue'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}

app.use(ElementPlus).component("messagePage", messagePage).component("dialogPage", dialogPage).use(store).use(router).mount('#app')

