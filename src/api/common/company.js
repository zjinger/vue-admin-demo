import http from '@/http'
const baseUrl = `/api/company/getList`
/**
 * 获取公司列表
 */
const getCompanyList = () => http.post(baseUrl, {})
export default {
  getCompanyList
}
