import request from '@/utils/request';

/**
 * 配置request请求时的默认参数
 */
// const request = extend({
//   prefix: config.requestPrefix,
//   // credentials: 'include', // 默认请求是否带上cookie
// });

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/v1/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
