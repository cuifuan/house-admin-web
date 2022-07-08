<template>
  <a-layout id="components-layout-custom-style" theme="light">
    <a-layout-sider width="210" v-model:collapsed="collapsed">
      <div class="title">
        <span v-if="!collapsed">云管理平台</span>
        <IconFont type="bran-icon-house" v-else />
      </div>
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
// let collapsed = false
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
.title {
  height: 50px;
  line-height: 50px;
  //background-color: #3d5a80;
  border-bottom-color: white;
  color: white;
  font-size: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
