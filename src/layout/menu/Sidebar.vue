<template>
  <div class="sidebar">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :open-keys="openKeys"
      theme="dark"
      @click="menuClick"
    >
      <ReSubMenuVue :menuList="menuList"></ReSubMenuVue>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ReSubMenuVue from './ReSubMenu.vue';
import { useRoute, useRouter } from 'vue-router';
import { dbStore, useStore } from '@/store';
import { MenuTab } from '@/model/menu';

const store = useStore();
const storeX = dbStore();

const menuList = store.menuList;
const router = useRouter();

const selectedKeys = computed(() => storeX.selectKeys);
const openKeys = computed(() => storeX.openKeys);

// 按钮点击事件
const menuClick = (item: any) => {
  let openKeys: string[] = [];
  // 获取父级路由
  const parentPath = '/' + item.item.path.split('/')[1];
  router.getRoutes().forEach((r) => {
    if (r.path === parentPath) {
      openKeys.push('sub' + JSON.stringify(r.name).replaceAll('"', ''));
    }
  });
  const tab: MenuTab = {
    path: item.item.path,
    name: item.key,
    label: item.key,
    icon: item.item.icon,
    checked: true,
    selectKeys: [item.key],
    openKeys: openKeys,
  };
  storeX.selectMenu(tab);
};
</script>
<style lang="less" scoped>
.sidebar {
  width: 20%;
  height: 100%;
  float: left;
  box-sizing: border-box;
  background-color: @bg-color;
}
</style>
