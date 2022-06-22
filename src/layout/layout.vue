<template>
  <a-layout id="components-layout-custom-style" theme="light">
    <a-layout-sider width="266" v-model:collapsed="collapsed">
      <Sidebar></Sidebar>
    </a-layout-sider>
    <a-layout class="right-custom">
      <a-layout-header style="line-height: 90px; height: 90px">
        <Header></Header>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'
import Sidebar from '@/layout/menu/Sidebar.vue'
import { computed, ref } from 'vue'
import { dbStore } from '@/store'

const storeX = dbStore()
const collapsed = computed(() => storeX.collapsed)
const toggleCollapsed = () => {
  console.log(1122)
  const flag = !collapsed
  storeX.setCollapsed(flag)
  if (flag) {
    storeX.openKeys = []
    storeX.preOpenKeys = storeX.openKeys
  } else {
    storeX.openKeys = storeX.preOpenKeys || []
  }
}
</script>
<style lang="less" scoped>
@menu-width: 266px;
#components-layout-custom-style {
  height: 100%;

  .right-custom {
    .ant-layout-header {
      background-color: #ffffff;
      height: 90px;
      padding: 0;
      margin: 0;
    }

    .ant-layout-content {
      background-color: #ffffff;
      // height: 90px;
      padding-left: 20px;
      padding-top: 20px;
      margin: 0;
      box-sizing: border-box;
    }
  }
}
</style>
