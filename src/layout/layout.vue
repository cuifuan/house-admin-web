<template>
  <div class="content">
    <Sidebar></Sidebar>
    <div class="page">
      <Header></Header>
      <div class="main">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
  <!-- <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Sidebar class="sidebar"></Sidebar>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Header></Header> -->
  <!-- <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
  <!-- </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout> -->
</template>

<script setup lang="ts">
import Header from '@/layout/Header.vue';
import Footer from '@/layout/Footer.vue';
import Sidebar from '@/layout/menu/Sidebar.vue';
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  .page {
    width: 80%;
  }
  .main {
    height: 80%;
    padding: 20px 20px;
    box-sizing: border-box;
  }

  // overflow: hidden;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
