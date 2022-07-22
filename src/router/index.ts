import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import { App } from "vue";
import store from "store/index";

const Layout = () => import("@/layout/index.vue");


// 业务路由
const Login = () => import("@/views/account/login.vue");

const AlarmList = () => import('@/views/alarm-management/list.vue');
const AlarmSetting = () => import('@/views/alarm-management/setting.vue');

const Dashboard = () => import('@/views/dashboard/index.vue');

const UserList = () => import('@/views/user-management/user-list.vue');

const DomainList = () => import('@/views/data-management/domain-list.vue');
const ErrorList = () => import('@/views/data-management/error-list.vue');
const InterfaceList = () => import('@/views/data-management/interface-list.vue');

const SystemSetting = () => import('@/views/setting/index.vue');

// 通用路由表
export const constRoutes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {title: "登录页", hidden: true},
    },
    {
        path: "/404",
        name: "404",
        component: {template: "<div>404页面</div>"},
        meta: {title: "404", hidden: true},
    },
];

// 动态路由表：根据权限加载
export const dynamicRoutes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: Layout,
        redirect: {
            name: 'dashboard-index'
        },
        meta: {title: "控制台", icon: "LaptopOutlined", role: ["admin"]},
        children: [
            {
                path: "",
                name: "dashboard-index",
                meta: {title: "控制台", role: ["admin"]},
                component: Dashboard,
            },
        ],
    },
    {
        path: "/user",
        name: "user-management",
        component: Layout,
        redirect: {
            name: 'user-list'
        },
        meta: {title: "用户管理", icon: "UserOutlined", role: ["admin"]},
        children: [
            {
                path: "list",
                name: "user-list",
                meta: {title: "用户列表", role: ["admin"]},
                component: UserList,
            },
        ],
    },
    {
        path: "/data",
        name: "data-management",
        component: Layout,
        redirect: {
            name: 'domain-list'
        },
        meta: {title: "数据管理", icon: "SnippetsOutlined", role: ["admin"]},
        children: [
            {
                path: "domain-list",
                name: "domain-list",
                meta: {title: "域名列表", role: ["admin"]},
                component: DomainList,
            },
            {
                path: "interface-list",
                name: "interface-list",
                meta: {title: "接口列表", role: ["admin"]},
                component: InterfaceList,
            },
            {
                path: "error-list",
                name: "error-list",
                meta: {title: "报错信息", role: ["admin"]},
                component: ErrorList,
            },
        ],
    },
    {
        path: "/alarm",
        name: "alarm-management",
        component: Layout,
        redirect: {
            name: 'alarm-list'
        },
        meta: {title: "告警管理", icon: "AlertOutlined", role: ["admin"]},
        children: [
            {
                path: "list",
                name: "alarm-list",
                meta: {title: "告警列表", role: ["admin"]},
                component: AlarmList,
            },
            {
                path: "setting",
                name: "alarm-setting",
                meta: {title: "告警设置", role: ["admin"]},
                component: AlarmSetting,
            },
        ],
    },
    {
        path: "/system",
        name: "system-management",
        component: Layout,
        redirect: {
            name: 'system-setting'
        },
        meta: {title: "系统管理", icon: "SettingOutlined", role: ["admin"]},
        children: [
            {
                path: "setting",
                name: "system-setting",
                meta: {title: "系统设置", role: ["admin"]},
                component: SystemSetting,
            },
        ],
    },
    // 一定要放在最后，且在动态路由中添加，避免所有页面都被拦截到404
    {path: "/:pathMatch(.*)*", redirect: "/404", meta: {hidden: true}},
];

/**
 * createWebHashHistory (hash路由 Hash模式 #)
 * createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
 * createMemoryHistory 带缓存 history 路由
 */
const router = createRouter({
    history: createWebHistory(),
    routes: constRoutes,
    // routes: R.concat(constRoutes, dynamicRoutes),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // 通过前进后台时才触发
            return savedPosition
        } else {
            // 滚动到顶部
            return {top: 0, behavior: "smooth"}
        }
    },
});

// 路由守卫，进行菜单和权限的处理
router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
        document.title = `${to.meta.title}`;
    }
    if (to.path === '/') {
		next({ name: 'dashboard' })
    }

    if (to.path === "/login" || to.path === "/register") {
        next();
    } else if (store.getters.routes.length <= 3) {
        // 防止无限循环，要根据条件停止：通用路由表长度3
        store.dispatch("generateRoutes");
        // @ts-ignore
        next({...to, replace: true});
    } else {
        next();
    }
});

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    if (isChunkLoadFailed) {
        location.reload()
    }
})

/**
 * 删除/重置路由
 * getRoutes()：获取一个包含所有路由记录的数组
 * hasRoute()：检查路由是否存在
 */
export function resetRoute(): void {
    router.getRoutes().forEach((route) => {
        const {name} = route;
        if (name) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;
