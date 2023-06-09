import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePage from '@/components/messagePage'

createApp(App).use(store).component("messagePage",messagePage).use(router).mount('#app')
