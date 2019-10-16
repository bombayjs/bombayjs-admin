import request from '@/utils/request';

/**
 * 获取纬度-页面中的列表数据
 * @param params <IGetLatitude>
 */
export async function getLatitudeData(params: IGetLatitude) {
  return request('/api/v1/retcode/web', {
    method: 'POST',
    data: params,
  });
}
