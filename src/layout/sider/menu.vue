<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    @click="handleMenuClick"
  >
    <template v-for="item in menus">
      <!-- 一级菜单 -->
      <a-menu-item
        v-if="
          !item.children ||
            (item.children && item.children.length && item.children.length === 1)
        "
        :key="item.name"
      >
        <router-link
          :to="{
            name:
              item.children && item.children.length && item.children.length === 1
                ? item.children[0].name
                : item.name
          }"
        >
          <Icon
            v-if="item.meta && item.meta.icon"
            :icon="item.meta.icon"
          />
          <span>{{ item.meta && item.meta.title }}</span>
        </router-link>
      </a-menu-item>
      <!-- 子级菜单 -->
      <SubMenu
        v-else
        :key="item.name"
        :menu-info="item"
      />
    </template>
  </a-menu>
</template>

<script lang="ts">
import * as R from 'ramda';
import { defineComponent, computed, ref, toRefs, reactive, watch } from 'vue';
// import { useRouter } from "vue-router";
import { useStore } from 'store/index';
import SubMenu from './subMenu.vue';

export default defineComponent({
    components: {
        SubMenu,
    },
    setup() {
        const store = useStore();
        const routes = computed(() => store.state.routes.routes);
        const menus = computed(() => store.state.routes.menus);
        // console.log("routes", routes.value);
        // console.log("menus", menus.value);

        // 路由查看调用
        // const { options, getRoutes } = useRouter();
        // console.log("getRoutes", getRoutes());
        // console.log("options.routes", options.routes);

        const state = reactive({
            selectedKeys: localStorage.getItem('selectedMenu')
                ? [localStorage.getItem('selectedMenu')]
                : [],
            openKeys: localStorage.getItem('openMenu')
                ? R.split(',', localStorage.getItem('openMenu') || '')
                : [],
        });

        const handleMenuClick = ({ key, keyPath }) => {
            store.commit('SELECTED_MENU', key);
            store.commit('OPEN_MENU', state.openKeys);
            // 保存选中路径
            store.commit('SET_BREADCRUMB', keyPath);
        };

        return {
            routes,
            menus,

            ...toRefs(state),
            handleMenuClick,
        };
    },
});
</script>
