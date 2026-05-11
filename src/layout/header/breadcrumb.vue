<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item
      v-for="item in breadcrumbMenu"
      :key="item.name"
    >
      <router-link :to="{ name: item.name }">
        {{ item.title }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'store/index';
import type { RouteRecord } from 'store/interface';

interface BreadcrumbItem {
  name: string;
  title: string;
}

const store = useStore();
const menus = computed<RouteRecord[]>(() => store.state.routes.menus);
const breadcrumbList = computed<string[]>(() => store.state.settings.breadcrumbList || []);

const filterBreadcrumb = (
  menuList: RouteRecord[],
  path: string[],
  result: BreadcrumbItem[] = []
): BreadcrumbItem[] => {
  if (!(menuList?.length && path?.length)) {
    return result;
    }
  const [node, ...restPath] = path;
    if (node) {
    const item = menuList.find(menu => menu.name === node);
    if (!item?.name || !item.meta?.title) {
      return result;
    }
    result.push({ name: item.name, title: item.meta.title });
        if (item?.children) {
      return filterBreadcrumb(item.children, restPath, result);
        }
        return result;
    }
  return result;
};

const breadcrumbMenu = computed<BreadcrumbItem[]>(() =>
  filterBreadcrumb(menus.value, [...breadcrumbList.value])
);
</script>

<style></style>
