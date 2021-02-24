import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/base.css'
import less from 'less'

createApp(App).use(store).use(router).use(less).mount('#app')
