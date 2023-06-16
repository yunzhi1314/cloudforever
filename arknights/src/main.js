import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册全局组件
import dialogPage from './components/dialogPage.vue'//遮罩组件
import messagePage from './components/messagePage.vue'//吐丝组件

createApp(App).component('dialogPage',dialogPage).component('messagePage',messagePage).use(store).use(router).mount('#app')
