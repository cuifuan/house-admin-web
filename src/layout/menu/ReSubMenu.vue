<template>
  <template v-for="(menu, index) in menuList" :key="index">
    <a-sub-menu v-if="menu.children && menu.children.length" :key="menu.name" :path="menu.path">
      <template #title>{{ menu.meta.title }}</template>
      <template #icon>
        <IconFont :type="menu.meta.icon" />
      </template>
      <ReSubMenu :menuList="menu.children" :parentPath="menu.path" />
    </a-sub-menu>
    <a-menu-item v-else :key="menu.name" :path="menu.path">
      <router-link :to="parentPath ? parentPath + '/' + menu.path : menu.path"
        >{{ menu.meta.title }}
      </router-link>
    </a-menu-item>
  </template>
</template>
<script lang="ts" setup>
import { MenuInterface } from '@/model/menu'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_3017944_l8ypc9406af.js',
})
defineProps({
  menuList: {
    type: Array as () => Array<MenuInterface>,
    default: () => [],
  },
  parentPath: {
    type: String,
    default: null,
  },
})
</script>
<style lang="less" scoped></style>
