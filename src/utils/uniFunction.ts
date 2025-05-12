export const showLoading = (loadingText = '加载中') => {
  uni.showLoading({
    title: loadingText,
  })
}

export const closeLoading = () => uni.hideLoading()

export const navigateTo = (url: string) => uni.navigateTo({ url })

export const showToast = (message: string) => uni.showToast({
  title: message,
  icon: 'none'
})
