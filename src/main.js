import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 Pinia
import App from './App.vue'
import router from './router' // 引入路由
import Antd from 'ant-design-vue'; // 引入 Ant Design Vue
import 'ant-design-vue/dist/reset.css'; // 引入 Ant Design Vue 样式

const app = createApp(App)
const pinia = createPinia() // 创建 Pinia 实例

app.use(pinia) // 使用 Pinia
app.use(router) // 使用路由
app.use(Antd) // 使用 Ant Design Vue
app.mount('#app')