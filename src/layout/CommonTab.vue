<template>
  <a-tag
    v-for="tag in tags"
    :closable="tag.name !== 'home'"
    :key="tag.label"
    size="small"
    :disable-transitions="false"
    :checked="tag.checked"
    class="tag_bran"
    :color="tag.checked ? '#2db7f5' : 'default'"
    @click="changeMenu(tag)"
    @close="close(tag)"
    >{{ tag.label }}</a-tag
  >
</template>

<script lang="ts" setup>
import { MenuTab } from '@/model/menu';
import { dbStore } from '@/store';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

//获取vuex的标签集合数据
const storeX = dbStore();
const tags = computed(() => storeX.tabsList);
const router = useRouter();

//选择标签跳转路由
const changeMenu = (item: any) => {
  router.push(item.path);
  const pathArray = item.path.split('/');
  let parentRoute = '';
  if (pathArray && pathArray.length >= 1) {
    parentRoute = '/' + pathArray[1];
  }
  const selectKeys: string[] = [];
  const openKeys: string[] = [];
  router.getRoutes().forEach((route) => {
    if (route.path === item.path) {
      const keys: string = JSON.stringify(route.name).replaceAll('"', '');
      selectKeys.push(keys);
    }
    if (parentRoute === route.path) {
      const keys: string = 'sub' + JSON.stringify(route.name).replaceAll('"', '');
      openKeys.push(keys);
    }
  });
  const tab: MenuTab = {
    path: item.path,
    name: item.name,
    label: item.label,
    icon: item.icon,
    checked: true,
    selectKeys: selectKeys,
    openKeys: openKeys,
  };
  storeX.selectMenu(tab);
};
const close = (item: MenuTab) => {
  let path = storeX.closeTab(item);
  if (path) {
    router.push(path);
  }
};
</script>
<style lang="less" scoped>
.tag_bran {
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
</style>
