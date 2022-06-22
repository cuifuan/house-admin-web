<template>
  <template v-for="(menu, index) in menuList" :key="index">
    <a-sub-menu
      v-if="menu.children && menu.children.length"
      :key="'sub' + menu.name"
      :path="menu.path"
    >
      <template #title>{{ menu.name }}</template>
      <template #icon>
        <IconFont :type="menu.icon" />
      </template>
      <ReSubMenu :menuList="menu.children" />
    </a-sub-menu>
    <a-menu-item v-else :key="menu.name" :path="menu.path">
      <router-link :to="menu.path">{{ menu.name }}</router-link>
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
})
</script>
<style lang="less" scoped></style>
