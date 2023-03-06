import request from '@/utils/request'
export function getTest() {
  return request({
    url: '/api/createUser',
    method: 'get'
  })
}
