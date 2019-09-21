<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign in
          </h1>
          <p class="text-xs-center">
            <a href="/register">Need an account?</a>
          </p>

          <!-- <ul class="error-messages">
            <li>That email is already taken</li>
          </ul> -->

          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right" @click="handleLogin">
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 加载js-cookie
// 此位置，客户端会执行，服务端也会执行
// 判断是否是客户端执行，如果是客户端执行，加载客户端处理cookie的模块
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'noauthenticated',
  data () {
    return {
      user: {
        email: 'xxxyyy123a@xxxyy.cn',
        password: '12345678'
      }
    }
  },
  methods: {
    // 在客户端执行
    async handleLogin () {
      try {
        const { user } = await this.$axios.$post('/users/login', {
          user: this.user
        })
        // 存储登录状态
        // 把登录成功的状态存储到客户端的cookie中
        // cookie中只能存储字符串，Cookie模块内部会把user对象转换成JSON形式的字符串
        Cookie.set('user', user, {
          // cookie 7天以后过期
          expires: 7
        })

        // 把登录状态记录到 vuex 的store中
        this.$store.commit('setUser', user)

        // console.log(user)
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
