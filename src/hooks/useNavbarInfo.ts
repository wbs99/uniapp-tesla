export interface NavbarInfo {
  navBarHeight: number // 自定义导航栏高度
  statusBarHeight: number // 状态栏高度
  menuBtnRect: UniApp.GetMenuButtonBoundingClientRectRes
}

export const useNavbarInfo = () => {
  const windowInfo = uni.getWindowInfo()
  const menuBtnRect = uni.getMenuButtonBoundingClientRect()

  // 兼容性兜底
  const statusBarHeight = windowInfo.statusBarHeight ?? (uni.getDeviceInfo().platform === 'ios' ? 44 : 24)

  // 导航栏高度 = 状态栏高度 + 44（与原文一致）
  const navBarHeight = statusBarHeight + 44

  return {
    navBarHeight,
    statusBarHeight,
    menuBtnRect,
  }
}
