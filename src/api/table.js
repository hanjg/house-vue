import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getSecondHandHouse(params) {
  return request({
    url: '/house/secondHandHouse/list',
    method: 'get',
    params
  })
}

export function getSecondHandHouseSummary(params) {
  return request({
    url: '/house/secondHandHouse/summary/list',
    method: 'get',
    params
  })
}

export function getDistrictSecondHandHouseSummary() {
  return request({
    url: '/house/secondHandHouse/summary/range',
    method: 'get'
  })
}

export function getSecondHandHouseSpider() {
  return request({
    url: '/house/crawler/secondHandHouse/status',
    method: 'get'
  })
}

export function getAllDistricts() {
  return request({
    url: '/house/secondHandHouse/districts',
    method: 'get'
  })
}
