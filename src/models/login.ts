import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority, setToken } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

type Status = 'ok' | 'error';
type CurrentAuthority = 'user' | 'guest' | 'admin';

export interface StateType {
  status?: Status;
  type?: string;
  currentAuthority?: CurrentAuthority;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response);
      yield put({
        type: 'changeLoginStatus',
        payload: { ...response, type: payload.type },
      });
      // Login successfully
      if (response.code === 200) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // if (payload)
      const status: Status = payload.code === 200 ? 'ok' : 'error';
      let currentAuthority: CurrentAuthority = 'guest';
      if (payload.code === 200) {
        currentAuthority = payload.data.level === 0 ? 'admin' : 'user';
        setAuthority(currentAuthority);
        setToken(payload.data.token);
      }
      return {
        ...state,
        status,
        type: payload.type,
        currentAuthority,
      };
    },
  },
};

export default Model;
