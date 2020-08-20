/**
 * Created by ZJ 2020/08/11
 */

/**
 * 基础service 请求封装
 */
import axios from './axios'
/**
 * 发送post 请求
 * 比如获取列表：data:{currentPage:1,pageRecord:10}
 * @param {*} url
 * @param {*} dataa
 */
const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({ url, method: 'post', data })
      .then(res => {
        if (res && res.rlt == 0) {
          resolve(res.datas)
        } else {
          reject(res.info)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * 发送get请求
 * 例如：获取详情
 * 请求的url：/api/xxx/getInfo/xxxxx
 * @param {*} url
 */
const get = url => {
  return new Promise((resolve, reject) => {
    axios({ url, method: 'get' })
      .then(res => {
        if (res && res.rlt == 0) {
          resolve(res.datas)
        } else {
          reject(res.info ? res.info : '系统错误')
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default {
  get,
  post
}
