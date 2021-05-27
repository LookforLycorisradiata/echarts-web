import axios from 'axios'

axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: '',
  // withCredentials: true, // 表示跨域请求时是否需要使用凭证
  timeout: 15000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加相应拦截器
service.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default service
