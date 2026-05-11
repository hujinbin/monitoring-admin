import * as R from 'ramda';
import { Module } from 'vuex';
import type { RouteRecordRaw } from 'vue-router';
import { RoutesState, RootStateTypes, RouteRecord } from '../interface/index';
import router, { constRoutes, dynamicRoutes, resetRoute } from '../../router';

const routes: Module<RoutesState, RootStateTypes> = {
    state() {
        return {
            routes: constRoutes,
            menus: [],
        };
    },
    getters: {
        routes: (state) => state.routes,
    },
    mutations: {
        SET_ROUTE(state: RoutesState, data: RouteRecord[]) {
            state.routes = data;
        },
        SET_MENU(state: RoutesState, data: RouteRecord[]) {
            state.menus = data;
        },
    },
    actions: {
        generateRoutes({ commit }, roles) {
            return new Promise((resolve) => {
                const routes = R.concat(constRoutes, dynamicRoutes);
                const menus = generateMenu(routes);
                resetRoute();
                R.forEach((route: RouteRecordRaw) => {
                    router.addRoute(route);
                }, routes);
                // console.log('routes', routes);
                // console.log('menus', menus);
                commit('SET_ROUTE', routes);
                commit('SET_MENU', menus);
                resolve(routes);
            });
        },
    },
};

export default routes;

/* =========== helps ============= */
//
const hasPermission = (roles: string[], route: RouteRecord) => {
    const routeRoles = route.meta?.role;
    if (routeRoles?.length) {
        return roles.some((role: string) => routeRoles.indexOf(role) >= 0);
    }
    return true;
};

// 根据角色清洗路由表
const cleanRotes = (routes: RouteRecord[], roles: string[]) => {
    const accessRoutes = R.filter((v: RouteRecord) => {
        if (roles && roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
                v.children = R.filter((child: RouteRecord) => {
                    return hasPermission(roles, child);
                }, v.children);
                // 解决子菜单只有一个的情况
                if (v.children && v.children.length === 1) {
                    v.name = v.children[0].name;
                    v.children = [];
                }
            }
            return true;
        }
        return false;
    }, routes);
    return accessRoutes;
};

// 生成菜单
const generateMenu = (routes: RouteRecord[]) => {
    const menus = R.filter((o: RouteRecord) => {
        if (o.meta && o.meta.hidden) {
            return false;
        }
        if (o.children && o.children.length) {
            o.children = generateMenu(o.children);
        }
        return true;
    }, routes);
    return menus;
};
