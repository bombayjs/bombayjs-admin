export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/register',
      },
    ],
  },
  // web
  {
    path: '/web',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/web/setting',
        name: 'setting',
        component: './web/setting',
        icon: 'setting',
      },
      {
        path: '/web/dashboard',
        name: 'dashboard',
        component: './web/dashboard',
        icon: 'dashboard',
      },
      {
        path: '/web/product',
        name: 'product',
        icon: 'fund',
        routes: [
          {
            path: '/web/product/circle',
            name: 'circle',
            component: './web/product/circle',
          },
          {
            path: '/web/product/eventvariate',
            name: 'eventvariate',
            component: './web/product/eventvariate',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/welcome',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './welcome',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/HomeLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/home',
          },
          {
            path: '/home',
            name: '项目列表',
            component: './projects/list',
          },
          {
            path: '/web/add',
            name: '新增项目',
            component: './web/add',
          },
          {
            name: 'settings',
            authority: ['user'],
            hideInMenu: true,
            path: '/account/settings',
            icon: 'setting',
            component: './account/settings',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
