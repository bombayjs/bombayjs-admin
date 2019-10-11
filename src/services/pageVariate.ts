import request from '@/utils/request';

export async function setPageVariateDao(params: IPageVariate) {
  return request('/api/v1/pagevariate/set', {
    method: 'POST',
    data: params,
  });
}

export async function getPageVariateListDao(params: IGetPageVariateListConditions): Promise<any> {
  return request('/api/v1/pagevariate/list', {
    method: 'POST',
    data: params,
  });
}

export async function getPageVariateDao(params: IGetPageVariateListConditions) {
  return request('/api/v1/pagevariate/get', {
    method: 'POST',
    data: params,
  });
}
