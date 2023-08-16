import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index'
import TusiVue from './components/Tusi.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component("Tusi",TusiVue)

app.use(router).use(store).use(ElementPlus).mount('#app')