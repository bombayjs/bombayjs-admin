import { Request, Response } from 'express';

export default {
  'POST /api/v1/user/login': (req: Request, res: Response) => {
    const { password, userName } = req.body;
    if (password === '12345678' && userName === 'hdl') {
      res.send({
        code: 200,
        data: {
          system_ids: [],
          is_use: 0,
          level: 1,
          createdAt: '2019-09-25T09:55:55.492Z',
          user_name: 'hdl',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo',
          id: '5d8b39ab0dafb043ed31699d',
        },
        msg: 'success',
      });
      return;
    }
    res.send({
      code: -1,
      data: {},
      msg: '用户密码不正确！',
    });
  },
  'POST /api/v1/user/logout': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NjY5NiwiZXhwIjoxNTcwNzE5ODk2fQ.eHhWXw4dGo76RkKdCE3k0cI9J0ZmM0BXiwX7kOVdqtg',
        },
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'POST /api/v1/user/register': (req: Request, res: Response) => {
    res.send({
      code: 200,
      data: {
        system_ids: [],
        is_use: 0,
        level: 1,
        _id: '5d9e998256114c131233a4f8',
        user_name: 'zoro',
        password: '',
        createdAt: '2019-10-10T02:37:54.265Z',
        updatedAt: '2019-10-10T02:37:54.265Z',
        __v: 0,
      },
      msg: 'success',
    });
  },
  'GET /api/v1/user/currentUser': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: {
          system_ids: [],
          is_use: 0,
          level: 1,
          user_name: 'hdl',
          createdAt: '2019-09-25T09:55:55.492Z',
          updatedAt: '2019-09-25T09:55:55.492Z',
          __v: 0,
          id: '5d8b39ab0dafb043ed31699d',
        },
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'POST /api/v1/project/add': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: {
          type: ' web',
          user_id: ['5d8b39ab0dafb043ed31699d'],
          is_use: 1,
          slow_page_time: 5,
          slow_js_time: 2,
          slow_css_time: 2,
          slow_img_time: 2,
          slow_ajax_time: 2,
          is_daily_use: 1,
          daliy_list: [],
          is_highest_use: 1,
          highest_list: [],
          _id: '5d9e9f4856114c131233a4f9',
          project_name: 'bb',
          token: 'mNTdQay1570676552092',
          createdAt: '2019-10-10T03:02:32.095Z',
          updatedAt: '2019-10-10T03:02:32.095Z',
          __v: 0,
        },
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'POST /api/v1/project/delete': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: {},
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'GET /api/v1/project/web/list': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: [
          {
            _id: '5d9c2a48bbfb5af8cb0601bf',
            type: 'web',
            user_id: ['5d8b39ab0dafb043ed31699d'],
            is_use: 1,
            slow_page_time: 5,
            slow_js_time: 2,
            slow_css_time: 2,
            slow_img_time: 2,
            slow_ajax_time: 2,
            is_daily_use: 1,
            daliy_list: [],
            is_highest_use: 1,
            highest_list: [],
            project_name: 'mobile',
            token: '4hjrkwk1569405386362',
            url: 'http://localhost:8099/flight',
            createdAt: '2019-10-08T06:18:48.791Z',
            updatedAt: '2019-10-08T06:18:48.791Z',
            __v: 0,
            userlist: [],
          },
          {
            _id: '5d9e9f4856114c131233a4f9',
            type: ' web',
            user_id: ['5d8b39ab0dafb043ed31699d'],
            is_use: 1,
            slow_page_time: 5,
            slow_js_time: 2,
            slow_css_time: 2,
            slow_img_time: 2,
            slow_ajax_time: 2,
            is_daily_use: 1,
            daliy_list: [],
            is_highest_use: 1,
            highest_list: [],
            project_name: 'bb',
            token: 'mNTdQay1570676552092',
            createdAt: '2019-10-10T03:02:32.095Z',
            updatedAt: '2019-10-10T03:02:32.095Z',
            __v: 0,
            userlist: [],
          },
        ],
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'POST /api/v1/eventvariate/set': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: {
          is_use: 1,
          _id: '5d9ea19056114c131233a4fa',
          user_id: '5d8b39ab0dafb043ed31699d',
          project_token: '4hjrkwk1569405386362',
          name: 'c1',
          marker: 'c1',
          type: 'customer',
          createdAt: '2019-10-10T03:12:16.835Z',
          updatedAt: '2019-10-10T03:12:16.835Z',
          __v: 0,
        },
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'POST /api/v1/eventvariate/list': (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (
      authorization ===
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOGIzOWFiMGRhZmIwNDNlZDMxNjk5ZCIsImlhdCI6MTU3MDY3NDgwNSwiZXhwIjoxNTcwNzE4MDA1fQ.d7R832MztgW0ZY4MiDFPgDcPwLWpWe0lxgkJl2MXwgo'
    ) {
      res.send({
        code: 200,
        data: [
          {
            is_use: 1,
            _id: '5d9d9a4fde1900963df27292',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: 'customer-key10',
            marker: 'customer-key1',
            type: 'customer',
            createdAt: '2019-10-09T08:29:03.726Z',
            updatedAt: '2019-10-09T09:33:43.812Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9ae3de1900963df27293',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: 'customer-key2',
            marker: 'customer-key2',
            type: 'customer',
            createdAt: '2019-10-09T08:31:31.984Z',
            updatedAt: '2019-10-09T08:31:31.984Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9b04de1900963df27294',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: 'customer-key3',
            marker: 'customer-key3',
            type: 'customer',
            createdAt: '2019-10-09T08:32:04.431Z',
            updatedAt: '2019-10-09T08:32:04.431Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9be2de1900963df27295',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: 'customer-key4',
            marker: 'customer-key4',
            type: 'customer',
            createdAt: '2019-10-09T08:35:46.536Z',
            updatedAt: '2019-10-09T08:35:46.536Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c0dde1900963df27296',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '单程按钮',
            marker:
              'div#mescroll.mescroll.mescroll-bar > div.index__search-content___1Q2eh > div.index__index-blue-bg___3EecI > div.index__index-trip-type___29-Sj > div.index__trip-type-text___2sF9Q.index__active-text___3yxY2',
            type: 'circle',
            createdAt: '2019-10-09T08:36:29.136Z',
            updatedAt: '2019-10-09T11:01:18.383Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c16de1900963df27297',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '往返按钮',
            marker:
              'div#mescroll.mescroll.mescroll-bar > div.index__search-content___1Q2eh > div.index__index-blue-bg___3EecI > div.index__index-trip-type___29-Sj > div.index__trip-type-text___2sF9Q',
            type: 'circle',
            createdAt: '2019-10-09T08:36:38.258Z',
            updatedAt: '2019-10-09T08:36:38.258Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c4ade1900963df27298',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '交换机场按钮',
            marker:
              'div.index__tripWrapper___1GWcw.index__bottom-88___M0EPK > div.index__trip-item___3fsdc > div.index__flight-row___1B1LP > div.index__flight-swap___fSvkU > i.iGolaIconFont.igola-icon_overseas_home_switch.index__icon-swap___Nsxqs',
            type: 'circle',
            createdAt: '2019-10-09T08:37:30.801Z',
            updatedAt: '2019-10-09T08:37:30.801Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c52de1900963df27299',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '出发地',
            marker:
              'div.index__trip-item___3fsdc > div.index__flight-row___1B1LP > div.index__flight-line___10zG1 > div > div.index__flight-line-content-gapless___2mDRL',
            type: 'circle',
            createdAt: '2019-10-09T08:37:38.284Z',
            updatedAt: '2019-10-09T08:37:38.284Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c57de1900963df2729a',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '目的地',
            marker:
              'div.index__trip-item___3fsdc > div.index__flight-row___1B1LP > div.index__flight-line___10zG1 > div > div.index__flight-line-content-gapless___2mDRL.index__text-right___3lbOd',
            type: 'circle',
            createdAt: '2019-10-09T08:37:43.138Z',
            updatedAt: '2019-10-09T08:37:43.138Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c62de1900963df2729b',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '出发日期',
            marker:
              'div.index__tripWrapper___1GWcw.index__bottom-88___M0EPK > div.index__trip-item___3fsdc > div.index__flight-row___1B1LP.index__flight-line___10zG1 > div.index__flex-item___1kJck > div.index__flight-line-content-gap___1J9Fw',
            type: 'circle',
            createdAt: '2019-10-09T08:37:54.110Z',
            updatedAt: '2019-10-09T08:37:54.110Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c6fde1900963df2729c',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '首页舱位选择',
            marker:
              'div.index__index-slider___2cLdn > div.index__tripWrapper___1GWcw.index__bottom-88___M0EPK > div.index__cabin-item___35q9B.index__flight-line___1v2Hl > div > div.index__flight-line-content-gap___3o229',
            type: 'circle',
            createdAt: '2019-10-09T08:38:07.064Z',
            updatedAt: '2019-10-09T08:38:07.064Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9d9c79de1900963df2729d',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: '成人个数',
            marker:
              'div.index__tripWrapper___1GWcw.index__bottom-88___M0EPK > div.index__cabin-item___35q9B.index__flight-line___1v2Hl > div > div.index__flight-row-align-right___332L1 > span.index__passengers-num___2RQTY',
            type: 'circle',
            createdAt: '2019-10-09T08:38:17.041Z',
            updatedAt: '2019-10-09T08:38:17.041Z',
            __v: 0,
          },
          {
            is_use: 1,
            _id: '5d9da9b2e72857b10541b405',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: 'customer-key6',
            marker: 'customer-key6',
            type: 'customer',
            createdAt: '2019-10-09T09:34:42.791Z',
            updatedAt: '2019-10-09T09:34:42.791Z',
            __v: 0,
          },
          {
            is_use: 0,
            _id: '5d9da9f8ed7bcab175092021',
            user_id: '5d8b39ab0dafb043ed31699d',
            project_token: '4hjrkwk1569405386362',
            name: 'customer-key7',
            marker: 'customer-key7',
            type: 'customer',
            createdAt: '2019-10-09T09:35:52.348Z',
            updatedAt: '2019-10-09T09:51:08.460Z',
            __v: 0,
          },
        ],
        msg: 'success',
      });
    } else {
      res.send('Token Expired');
    }
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
