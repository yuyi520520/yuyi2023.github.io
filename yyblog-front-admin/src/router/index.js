import { createRouter, createWebHistory } from 'vue-router'
import VueCookies from 'vue-cookies'

const routes = [
    {
        name: '登录',
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
    {
        name: '框架页',
        path: '/',
        component: () => import('../views/Framework.vue'),
        redirect:"/blog/list",
        children:[
            {
                name:'测试',
                path:'/blog/test',
                component:() => import('../views/blog/test.vue'),
            },
            {
                name:'博客管理',
                path:'/blog/list',
                component:() => import('../views/blog/Blog.vue'),
            },
            {
                name:'分类管理',
                path:'/blog/classify',
                component:() => import('../views/blog/Classify.vue'),
            },
            {
                name:'专题管理',
                path:'/blog/subject',
                component:() => import('../views/blog/Subject.vue'),
            },
            {
                name:'个人信息设置',
                path:'/set/personal',
                component:() => import('../views/set/Personal.vue'),
            },
            {
                name:'系统设置',
                path:'/set/system',
                component:() => import('../views/set/System.vue'),
            },
            {
                name:'回收站',
                path:'/recycle',
                component:() => import('../views/recycle/Recycle.vue'),
            }
        ]
    }
];

//这里不是通过new来创建，通过createRouter 方法创建，使用的模式不是通过mode来定义
const router = createRouter({
    routes,
    history: createWebHistory(),
})

//如果没有COOKIE信息跳到登录也
router.beforeEach((to,from,next)=>{
    const userInfo = VueCookies.get("userInfo");
    if(!userInfo&&to.path != "/login"){
        router.push("/login");
    }
    next();
})

export default router