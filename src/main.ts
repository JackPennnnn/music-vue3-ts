import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入css
import './common/style/index.less'
createApp(App).use(store).use(router).mount('#app')
