<template>
  <div class="header">
    <div class="header_title">
      <a-row>
        <a-col :span="2" style="padding-left: 20px">
          <a-button @click="toggleCollapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
        </a-col>
        <a-col :span="8">
          <a-breadcrumb style="line-height: 50px">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item><a href="">一级</a></a-breadcrumb-item>
            <a-breadcrumb-item>地址</a-breadcrumb-item>
          </a-breadcrumb>
        </a-col>
        <a-col :span="7" class="title">云管理平台</a-col>
        <a-col :span="7" style="text-align: right; padding-right: 30px; box-sizing: border-box">
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
          admin
        </a-col>
      </a-row>
    </div>
    <div class="common_tab">
      <!--加入CommonTab-->
      <CommonTabVue></CommonTabVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonTabVue from './CommonTab.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
const collapsed = ref(false);
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
const newTabIndex = ref(0);
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 91px;
  background-color: #ffffff;
  color: #303133;
  box-sizing: border-box;

  .header_title {
    height: 50px;
    border-bottom: 1px solid #eff1f5;
    line-height: 50px;
  }
}

.common_tab {
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
  padding-top: 0px;
  border-bottom: 1px solid #eff1f5;
}

.title {
  font-size: 20px;
  text-align: center;
}
</style>
