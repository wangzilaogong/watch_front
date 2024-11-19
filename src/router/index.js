import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { userStore } from "@/store/userStore.js";
const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index.vue'),
        children: [
            {
                path: '/',
                name: 'indexPage',
                component: () => import('../views/noVerification/IndexPage.vue'),
                meta: {
                    title: 'index',
                }
            },
            {
                path: '/watch',
                name: 'Watch',
                component: () => import('../views/noVerification/watch.vue'),
                meta: {
                    title: 'watch',
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue'),
        meta: {
            title: '登录',
        }
    }
]

const Router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * 路由守卫
 */
Router.afterEach((to, from) => {
    if (to.path !== from.path) {
        // 路由正在发生变化，且新页面和旧页面不是同一个页面
        window.scrollTo(0, 0); // 滚动到页面顶部
    }
})
Router.beforeEach((to, from, next) => {
    const store = userStore();
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
    // if (to.path == '/login') {
    //     next()
    // } else {
    //     if (localStorage.getItem('token')) {
    //         if (to.meta.jurisdiction) {
    //             if (!store.userInfo.menus.includes(to.meta.jurisdiction)) {
    //                 next(false)
    //             } else {
    //                 next()
    //             }
    //         } else {
    //             next()
    //         }
    //     } else {
    //         next('/login')
    //     }
    // }
})
export default Router
