import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"

import Request from '@/utils/Request'
import Message from '@/utils/Message'
import BlogItem from '@/components/BlogItem.vue'
import CategoryItem from '@/components/CategoryItem.vue'
import CategoryList from '@/components/CategoryList.vue'
import UserItem from '@/components/UserItem.vue'
import "@/assets/base.scss"
const app = createApp(App)

app.use(router)
app.use(ElementPlus);
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message;
app.component("BlogItem",BlogItem);
app.component("CategoryItem",CategoryItem);
app.component("CategoryList",CategoryList);
app.component("UserItem",UserItem);
app.config.globalProperties.globalInfo = {
    imageUrl: "/api/file/getImage/"
}
app.mount('#app')
