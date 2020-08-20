import http from '@/http'
const baseUrl = '/api/manual'
const curdHandle = http.curd(baseUrl)
const getName = () => http.get(`${baseUrl}/getName`)
export default {
  curdHandle,
  getName
}
