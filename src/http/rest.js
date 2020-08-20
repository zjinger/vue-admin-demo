/**
 * CURD 操作
 */
import baseService from './base'
const get = baseService.get
const post = baseService.post
/**
 * CURD 操作
 * @param {*} baseUrl
 */
const curd = baseUrl => {
  return {
    getList: data => post(`${baseUrl}/getList`, data),
    getInfoById: id => get(`${baseUrl}/getInfo/${id}`),
    save: data => post(`${baseUrl}/save`, data),
    delete: id => get(`${baseUrl}/delete/${id}`)
  }
}
export default curd
