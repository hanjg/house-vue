import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getRentingHouse(params) {
  return request({
    url: '/house/rentingHouse/list',
    method: 'get',
    params
  })
}
