import { Reducer } from 'redux';
import { Effect } from 'dva';
import { getAllLog } from '@/services/viewDetail';

export interface logDataType {
  t: string;
  page: string;
  times: number;
  v: string;
  token: string;
  e: string;
  begin: number;
  uid: string;
  sid: string;
  sr: string;
  vp: string;
  ct: string;
  ul: string;
  _v: string;
  o: string;
  errcount: number;
  apisucc: number;
  apifail: number;
  healthy: number;
  stay: number;
  time?: number;
  load?: number;
  detector: {
    device: {
      name: string;
      version: number;
      fullVersion: string;
      iphone: number;
    };
    os: {
      name: string;
      version: number;
      fullVersion: string;
      ios: number;
    };
    engine: {
      name: string;
      version: number;
      fullVersion: string;
      mode: number;
      fullMode: string;
      compatible: boolean;
      webkit: number;
    };
    browser: {
      name: string;
      version: number;
      fullVersion: string;
      mode: number;
      fullMode: string;
      compatible: boolean;
      safari: number;
    };
  };
  body: {};
  location: {
    lat: number;
    lon: number;
  };
  ad_info: {
    nation: string;
    province: string;
    city: string;
    district: string;
    adcode: number;
  };
  ip: string;
  pv: number;
  uv: string;
  user_agent: string;
  '@timestamp': string;
}

export interface viewDetailStateType {
  allLog: {
    isLoadingData: boolean;
    total: number;
    allLogDataList: Array<logDataType>;
  };
  jsErrorLog?: {};
  apiLog?: {};
  pagePerformanceLog?: {};
  pvLog?: {};
}

export interface viewDetailModalType {
  namespace: string;
  state: viewDetailStateType;
  effects: {
    getAllLogAction: Effect;
  };
  reducers: {
    updateAllLogDataList: Reducer;
    updateAllLogTotal: Reducer;
    switchAllLogIsLoadingData: Reducer;
  };
}

const initState = {
  allLog: {
    isLoadingData: false,
    total: 0,
    allLogDataList: [],
  },
};

const viewDetailModal: viewDetailModalType = {
  namespace: 'viewdetail',
  state: initState,
  effects: {
    *getAllLogAction({ payload }, { call, put }) {
      const allLogResult = yield call(getAllLog, payload);
      yield put({ type: 'isLoadingData' });
      if (allLogResult.code === 200) {
        yield put({ type: 'updateAllLogTotal', payload: allLogResult.data.total });
        yield put({ type: 'updateAllLogDataList', payload: allLogResult.data.data });
      }
    },
  },
  reducers: {
    updateAllLogDataList(state, { payload }) {
      state.allLog.allLogDataList = payload;
      return state;
    },

    updateAllLogTotal(state, { payload }) {
      const { allLog } = state;
      allLog.total = payload;
      return Object.assign(state, allLog);
    },

    switchAllLogIsLoadingData(state, { payload }) {
      const { allLog } = state;
      allLog.isLoadingData = payload;
      return Object.assign(state, allLog);
    },
  },
};

export default viewDetailModal;
