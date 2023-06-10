import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import messagePage from '@/components/messagePage.vue'
import dialogPage from '@/components/dialogPage.vue'

createApp(App).component("messagePage", messagePage).component("dialogPage", dialogPage).use(store).use(router).mount('#app')
