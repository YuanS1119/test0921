// 判断是否有登录状态，如果有登录状态，跳转到首页
export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}
