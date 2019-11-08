import request from '@/utils/request';

export async function getAllLog(params: IPostAllLog): Promise<any> {
  return request('/api/v1/details/web', {
    method: 'POST',
    data: params,
  });
}
