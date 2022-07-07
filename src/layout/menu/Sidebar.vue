<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :open-keys="openKeys"
    @openChange="onOpenChange"
    theme="dark"
  >
    <!--    @click="menuClick"-->
    <ReSubMenuVue :menuList="menuList"></ReSubMenuVue>
  </a-menu>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRef, toRefs, watch } from 'vue'
import ReSubMenuVue from './ReSubMenu.vue'
import { useRouter } from 'vue-router'
import { dbStore, useStore } from '@/store'
import { MenuTab } from '@/model/menu'

const store = useStore()
const storeX = dbStore()

const menuList = store.menuList
const router = useRouter()
interface StateModel {
  rootSubmenuKeys: string[]
  openKeys: string[]
  selectedKeys: string[]
}

const state = reactive<StateModel>({
  rootSubmenuKeys: [],
  openKeys: [],
  selectedKeys: [],
})
menuList.forEach((menu) => {
  menu.children && state.rootSubmenuKeys.push('sub' + menu.name)
})
state.openKeys = storeX.openKeys
state.selectedKeys = storeX.selectKeys
storeX.$subscribe(
  (mutation, statex) => {
    /*
            * mutation主要包含三个属性值：
            *   events：当前state改变的具体数据，包括改变前的值和改变后的值等等数据
            *   storeId：是当前store的id
            *   type：用于记录这次数据变化是通过什么途径，主要有三个分别是
            *         “direct” ：通过 action 变化的
                      ”patch object“ ：通过 $patch 传递对象的方式改变的
                      “patch function” ：通过 $patch 传递函数的方式改变的
            *
            * */
    // console.log(JSON.parse(JSON.stringify(statex)))
    // console.log(JSON.parse(JSON.stringify(mutation)))
    state.selectedKeys = statex.selectKeys
    state.openKeys = statex.openKeys
  },
  {
    immediate: true,
  },
)

// 按钮点击事件
// const menuClick = (item: any) => {
//   console.log(item)
// 获取父级路由
// const parentPath = '/' + item.item.path.split('/')[1]
// let ary: string[] = []
// router.getRoutes().forEach((r) => {
//   if (r.path === parentPath) {
//     ary.push('sub' + JSON.stringify(r.name).replaceAll('"', ''))
//   }
// })
// const tab: MenuTab = {
//   path: item.item.path,
//   name: item.key,
//   label: item.key,
//   icon: item.item.icon,
//   checked: true,
//   selectKeys: [item.key],
//   openKeys: ary,
// }
// storeX.selectMenu(tab)
// }

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// const onOpenChange = (e: string[]) => {
//   const latestOpenKey = storeX.openKeys.find((key) => storeX.openKeys.indexOf(key) === -1) || ''
//   if (storeX.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//     storeX.openKeys = e
//   } else {
//     storeX.openKeys = latestOpenKey ? [latestOpenKey] : []
//   }
//   // storeX.setOpenKeys(e)
//   // penKeys = ['sub人员管理', 'sub租单模块']
//   // storeX.selectKeys = e
//   // console.log(e)
// }
const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    // state.openKeys = openKeys
    storeX.openKeys = openKeys
  } else {
    // state.openKeys = latestOpenKey ? [latestOpenKey] : []
    storeX.openKeys = latestOpenKey ? [latestOpenKey] : []
  }
  // if (openKeys) {
  // state.openKeys = openKeys
  // storeX.openKeys = openKeys
  // console.log(openKeys)
  // }
}

const { selectedKeys, openKeys } = toRefs(state)
</script>
<style lang="less" scoped></style>
