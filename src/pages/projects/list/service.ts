import request from '@/utils/request';

export async function addProjectDao(params: ProjectType) {
  return request('/api/v1/project/add', {
    method: 'POST',
    data: params,
  });
}

export async function demoDao(): Promise<any> {
  return request('/api/v1/project/add');
}
