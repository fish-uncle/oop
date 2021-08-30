import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)
import ElementPlus from 'element-plus'

app.use(ElementPlus, { size: 'mini', zIndex: 3000, labelPosition: 'left' })

app.use(router)
app.mount('#app')
