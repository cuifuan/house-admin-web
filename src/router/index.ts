// @/router/index.ts
import { MenuInterface } from '@/model/menu';
import { useStore } from '@/store';

import {
  createRouter,
  createWebHashHistory,
  RouterOptions,
  Router,
  RouteRecordRaw,
} from 'vue-router';

// 白名单(路径)
const whiteList = ['/login', '/404'];

// 基础页面
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/layout/layout.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'HomeIndex',
        component: () => import('@/pages/sys/Home.vue'),
      },
    ],
  },
];

// RouterOptions是路由选项类型
const options: RouterOptions = {
  // createWebHashHistory (hash路由 Hash模式 #)
  // createWebHistory (history路由 HTML5 模式 推荐，需要服务器配置支持)
  // createMemoryHistory 带缓存 history 路由
  // 添加baseUrl，createWebHistory(baseUrl)
  history: createWebHashHistory(),
  routes: routes,
};

// Router是路由对象类型
const router: Router = createRouter(options);

// const store = useStore();

export const registerRoutes = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const store = useStore();
    addRoutes(store.menuList);
    resolve(true);
  });
};

// 动态添加路由
const addRoutes = (menu: MenuInterface[], parentName?: string) => {
  menu.forEach((item) => {
    const route = {
      path: item.path,
      meta: { name: item.name, isAsync: true, icon: item.icon },
      name: item.name,
      redirect: item.redirect,
      component: () => import('../' + item.component + '.vue'),
    };
    parentName ? router.addRoute(parentName, route) : router.addRoute(route);

    if (item.children && item.children.length) {
      addRoutes(item.children, item.name);
    }
  });
};

//这里我用vuex的一个变量 asyncRoutestMark 来标识是否拼接过路由
router.beforeEach((to, from, next) => {
  const store = useStore();
  if (!store.asyncRoutestMark) {
    // 注册动态路由
    registerRoutes()
      .then(() => {
        store.setAsyncRoutestMark(true); // 添加路由后更改标识为true
        next({ ...to, replace: true }); //路由进行重定向放行
      })
      .catch((err) => {
        // 处理异常事件
        console.log(err);
      });
  } else {
    next();
  }
});

export default router;