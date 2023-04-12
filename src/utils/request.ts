/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-11 09:51:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-11 09:51:46
 * @FilePath: \echarts-map-demo\src\util\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

const service = axios.create({
  baseURL: '', // 请求本地json文件，那么baseURL取空字符串，域名就会是项目域名
  timeout: 30000
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    return Promise.resolve(res)
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default service
