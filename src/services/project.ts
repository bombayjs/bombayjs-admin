import request from '@/utils/request';

export async function addProjectDao(params: IProjectType) {
  return request('/api/v1/project/add', {
    method: 'POST',
    data: params,
  });
}

export async function getWebProjectListDao(): Promise<any> {
  return request('/api/v1/project/web/list');
}
