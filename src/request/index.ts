// service统一出口
import JasperRequest from './service'

const jasperRequest = new JasperRequest({
  baseURL: '',
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
