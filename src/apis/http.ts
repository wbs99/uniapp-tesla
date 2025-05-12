import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'
import { closeLoading, navigateTo, showLoading, showToast } from '@/utils/uniFunction'

export type httpMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined
export type RequestData = string | AnyObject | ArrayBuffer
export type ErrorResponse = {
  code: number
  msg: string
}

const userStore = useUserStore()
const appStore = useAppStore()
export const BASE_URL = import.meta.env.VITE_APP_API_BASEURL

export const http = <T>(
  method: httpMethod,
  url: string,
  data?: RequestData,
  options?: {
    _autoLoading?: boolean
    _loadingText?: string
    _buttonLoading?: boolean
  }
): Promise<T> => {
  if (options?._autoLoading === true) {
    showLoading(options?._loadingText)
  }
  if (options?._buttonLoading === true) {
    appStore.startButtonLoading()
  }

  return new Promise((resolve) => {
    uni.request({
      method,
      url: `${BASE_URL}${url}`,
      data,
      timeout: 10 * 1000,
      header: {
        'third-session': `${userStore.getToken()}`
      },
      success: (response: any) => {
        const { code, msg } = response.data
        if (code !== 200) {
          const fn = table[code]
          fn?.(msg)
        } else {
          resolve(response.data as T)
        }
        if (options?._autoLoading === true) { closeLoading() }
        if (options?._buttonLoading === true) { appStore.closeButtonLoading() }
      },
      fail: (error) => {
        console.log('这里进入请求错误')
        console.log(error)
        if (options?._autoLoading === true) { closeLoading() }
        if (options?._buttonLoading === true) { appStore.closeButtonLoading() }
        throw error
      }
    })
  })
}

const table: Record<string, undefined | ((errorMessage: string) => void)> = {
  401: () => {
    toLoginPage('登录超时，请重新登录')
  },
  403: () => {
    showToast('没有接口请求权限')
  },
  429: () => {
    showToast('请求过于频繁')
  },
  500: (errorMessage) => {
    showToast(errorMessage)
  },
  60001: () => {
    toLoginPage('登录超时，请重新登录')
  },
  60002: () => {
    toLoginPage()
  }
}
const toLoginPage = (errorMsg = 'token 为空，请重新登录') => {
  userStore.logout()
  navigateTo('/pages/login/index')
  showToast(errorMsg)
}
