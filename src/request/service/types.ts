import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface JasperRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface JasperRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: JasperRequestInterceptors<T>
  showLoading?: boolean
}
