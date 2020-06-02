import request from '@/utils/request'
import axios from 'axios'

export function querySpecificDisctrict(params) {
  return request({
    url: '/house/secondHandHouse/summary/specific',
    method: 'get',
    params
  })
}
