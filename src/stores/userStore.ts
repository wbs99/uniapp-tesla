import { navigateTo } from '@/utils/uniFunction'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const TOKEN_STORAGE_KEY = 'token'
    const Phone_STORAGE_KEY = 'phone'
    const UserInfo_STORAGE_KEY = 'me'
    const logout = () => {
      uni.removeStorageSync(TOKEN_STORAGE_KEY)
      uni.removeStorageSync(Phone_STORAGE_KEY)
      uni.removeStorageSync(UserInfo_STORAGE_KEY)
      navigateTo('/pages/login/index')
    }

    const phone = ref('')
    const setPhone = (phone: string) => {
      uni.setStorageSync(Phone_STORAGE_KEY, phone)
    }
    const getPhone = () => uni.getStorageSync(Phone_STORAGE_KEY)

    const setToken = (token: string) => {
      uni.setStorageSync(TOKEN_STORAGE_KEY, token)
    }
    const getToken = () => uni.getStorageSync(TOKEN_STORAGE_KEY)

    const userInfo = reactive<UserInfo>({
      id: '',
      userName: '',
      nickName: '',
      enterpriseId: 0
    })
    const setUserInfo = (data: UserInfo) => {
      uni.setStorageSync(UserInfo_STORAGE_KEY, data)
    }
    const getUserInfo: () => UserInfo = () => uni.getStorageSync(UserInfo_STORAGE_KEY)

    const toLoginPage = () => {
      if (!getToken()) {
        navigateTo('/pages/login/index')
      }
    }

    return {
      getToken, logout, toLoginPage, userInfo, phone, getPhone, setUserInfo, getUserInfo
    }
  }
)
