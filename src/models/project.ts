import { Reducer } from 'redux';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { getWebProjectListDao } from '@/services/project';
import { getPageQuery } from '@/utils/utils';

export interface ProjectStateType {
  projectToken?: string;
  projectList?: IProjectType[];
}

export interface ProjectModelType {
  namespace: string;
  state: ProjectStateType;
  effects: {
    fetchProjectList: Effect;
    setProjectToken: Effect;
  };
  reducers: {
    changeProjectList: Reducer<ProjectStateType>;
    changeProjectToken: Reducer<ProjectStateType>;
  };
}

const Model: ProjectModelType = {
  namespace: 'project',

  state: {
    projectToken: '',
    projectList: [],
  },

  effects: {
    *fetchProjectList({ payload }, { call, put }) {
      const response = yield call(getWebProjectListDao, payload);
      if (response.code === 200) {
        yield put({
          type: 'changeProjectList',
          payload: response.data,
        });
      }
    },
    *setProjectToken({ payload }, { call, put }) {
      const params = getPageQuery();
      const { token } = params;
      yield put({
        type: 'changeProjectToken',
        payload: token,
      });
    },
  },

  reducers: {
    changeProjectList(state, { payload }) {
      return {
        ...state,
        projectList: payload,
      };
    },
    changeProjectToken(state, { payload }) {
      return {
        ...state,
        projectToken: payload,
      };
    },
  },
};

export default Model;
