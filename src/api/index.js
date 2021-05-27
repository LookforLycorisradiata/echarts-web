/**
 * 请求配置文件，服务地址及各请求对应地址，请按实际情况替换
 */

import service from '@/utils/request'

// const baseUrl = '/api/device-service' // 如 设备服务

const baseUrl = '/api/manage'

// 获取安装包列表
export function getPackageList () {
  return service({
    url: baseUrl + '/remote-client/software/list',
    method: 'get'
  })
}

// 获取最新数据
export function getNewData () {
  return service({
    url: baseUrl + '/getNewData',
    method: 'get'
  })
}

/**
 * @description: 获取数据列表
 * @param {*} params  查询参数，支持时间筛选。注意时间间隔，一次不要获取太多数据。eg:{startTime:'2021-05-25 12:30:00',endTime:'2021-05-25 12:31:00'}
 * @return {*}
 */
export function getDataList (params) {
  return service({
    url: baseUrl + '/getNewData',
    method: 'get',
    params
  })
}