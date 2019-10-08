import request from '@/utils/request';

export async function addEventVariateDao(params: EventVariate) {
  return request('/api/v1/eventvariate/add', {
    method: 'POST',
    data: params,
  });
}

export async function getWebProjectListDao(): Promise<any> {
  return request('/api/v1/project/web/list');
}
