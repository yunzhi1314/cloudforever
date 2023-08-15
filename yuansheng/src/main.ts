import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import store from "@/store";
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(router).use(store).use(ElementPlus).mount('#app')

