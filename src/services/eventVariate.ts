import request from '@/utils/request';

export async function setEventVariateDao(params: EventVariate) {
  return request('/api/v1/eventvariate/set', {
    method: 'POST',
    data: params,
  });
}

export async function getEventVariateListDao(params: GetEventVariateListConditions): Promise<any> {
  return request('/api/v1/eventvariate/list', {
    method: 'POST',
    data: params,
  });
}
