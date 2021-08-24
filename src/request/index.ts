// service统一出口
import JasperRequest from './service'

const jasperRequest = new JasperRequest({
  baseURL: 'http://119.23.48.158:3000',
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default jasperRequest
