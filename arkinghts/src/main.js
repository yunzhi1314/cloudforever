import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册全局组件
import dialogPage from './components/dialogPage.vue'

createApp(App).component('dialogPage',dialogPage).use(store).use(router).mount('#app')
