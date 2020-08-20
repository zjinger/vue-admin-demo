/**
 * Created by ZJ 2020/08/11
 */

import axios from 'axios'
import config from '@/config/axios.config' // 导入默认配置
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: config.headers,
      responseType: config.responseType
    })
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        return config
      },
      error => {
        const errorInfo = error.response
        if (errorInfo) {
          const errorMsg = errorInfo.data || '未知错误信息'
          const errorStatus = errorInfo.status // 404 403 500 ... 等
          console.log(`errorCode：${errorStatus}，errMgs：${errorMsg}`)
        }
        return Promise.reject(error)
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = response.request.responseText
          // 转为json 数据
          data = JSON.parse(data)
        } else {
          data = response.data
        }
        return data
      },
      err => {
        // 响应报错
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break

            case 401:
              err.message = '未授权，请登录'
              break

            case 403:
              err.message = '拒绝访问'
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break

            case 408:
              err.message = '请求超时'
              break

            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break

            default:
              err.message = '未知错误信息'
          }
        }
        console.error('error', err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )
    //请求处理
    instance(options)
      .then(res => {
        resolve(res)
        return false
      })
      .catch(error => {
        reject(error)
      })
  })
}