import { MenuInterface, MenuTab } from '@/model/menu'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export interface State {
  asyncRoutestMark: boolean
  menuList: Array<MenuInterface>
}

export const useStore = defineStore({
  id: 'store', // 唯一 ID，可以配合 Vue devtools 使用
  state: (): State => ({
    asyncRoutestMark: false,
    menuList: [
      {
        path: '/sys',
        name: 'Admin',
        meta: {
          title: '系统管理',
          icon: 'bran-icon-menu-user',
        },
        menuId: 1,
        component: 'layout/layout',
        redirect: '/sys/user',
        children: [
          {
            path: 'user',
            name: 'AdminUser',
            menuId: 1001,
            meta: {
              title: '用户管理',
              icon: 'custom-icon-user3-copy',
            },
            component: '/pages/user/index',
          },
          {
            path: 'role',
            name: 'AdminRole',
            menuId: 1002,
            meta: {
              title: '角色管理',
              icon: 'icon-jiaose',
            },
            component: '/pages/role/index',
          },
        ],
      },
      {
        path: '/rent',
        name: 'Rent',
        menuId: 4,
        component: 'layout/layout',
        redirect: '/rent/owner',
        meta: {
          title: '业主租单',
          icon: 'bran-icon-menu-user',
        },
        children: [
          {
            path: 'owner',
            name: 'RentOwner',
            menuId: 4001,
            component: '/pages/rent/owner',
            meta: {
              title: '业主租单',
              icon: 'icon-jurassic_user',
            },
          },
          {
            path: 'tenant',
            name: 'RentTenant',
            menuId: 4002,
            meta: {
              title: '租客租单',
              icon: 'icon-jurassic_user',
            },
            component: '/pages/rent/tenant',
          },
        ],
      },
    ],
  }),
  getters: {},
  // 调用方法
  actions: {
    setAsyncRoutestMark(flag: boolean) {
      this.asyncRoutestMark = flag
    },
  },
})

export interface dbState {
  currentMenu: any
  tabsList: MenuTab[]
  selectKeys: string[]
  openKeys: string[]
  collapsed: boolean
  preOpenKeys?: string[]
  rootSubmenuKeys: string[]
}

// 持久化 store
export const dbStore = defineStore({
  id: 'db-store',
  state: (): dbState => ({
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'HomeIndex',
        label: '首页',
        icon: 'home',
        checked: true,
        selectKeys: [],
        openKeys: [],
      },
    ],
    selectKeys: [],
    openKeys: [],
    collapsed: false,
    rootSubmenuKeys: [],
    preOpenKeys: [],
  }),
  actions: {
    setCollapsed(val: boolean) {
      this.collapsed = val
    },
    //选择标签 选择面包屑
    selectMenu(val: MenuTab) {
      if (val.name === 'HomeIndex') {
        this.currentMenu = null
      } else {
        this.currentMenu = val
        //如果等于-1说明tabsList不存在那么插入，否则什么都不做
        let result = this.tabsList.findIndex((item) => item.name === val.name)
        result === -1 ? this.tabsList.push(val) : ''
      }
      this.tabsList.forEach((tab) => {
        tab.checked = tab.name === val.name
      })
      this.selectKeys = val.selectKeys
      this.openKeys = val.openKeys
    },
    //关闭标签
    closeTab(val: MenuTab) {
      let result = this.tabsList.findIndex((item) => item.name === val.name)
      this.tabsList.splice(result, 1)
      // 判断当前选中
      if (this.currentMenu.name && this.currentMenu.name === val.name) {
        const beforeMenuTab: MenuTab = this.tabsList[result - 1]
        this.selectMenu(beforeMenuTab)
        return beforeMenuTab.path
      }
      return ''
    },
    setOpenKeys(val: string[]) {
      console.log('设置 openKeys', val)
      this.openKeys = val
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'db-store',
        storage: localStorage,
      },
    ],
  },
})
