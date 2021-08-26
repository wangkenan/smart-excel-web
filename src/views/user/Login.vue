<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-panel">
        <div class="header">
          <!-- <img :src="global.STATIC_URL + '/fe/settlement/logo_white.png'" /> -->
        </div>
        <div class="login-form-content">
          <div></div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">登录</h3>
            </div>

            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请填写邮箱或手机号"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                maxlength="30"
              />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请填写密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                maxlength="30"
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-bottom: 10px"
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
            <!-- <div class="tips">
              <span><router-link to="/user/reset">忘记密码</router-link></span>
            </div> -->
            <div class="tc tagColor">
              还没有账号？请联系客服开通
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <div>北京xxx有限公司版权所有</div>
      <div>
        京ICP备17027585号-1 Copyright
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能低于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入手机号或者邮箱' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  // .login-container .el-input input {
  //   color: $cursor;
  // }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    input {
      // background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      height: 47px;
      // caret-color: $cursor;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;
  .login-footer {
    width: 100%;
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
  }
  .login-content {
    height: calc(100vh - 92px);
    background: #889aa4;
    display: flex;
    justify-content: center;
    .login-panel {
      width: 1360px;
      // height: calc(100vh - 132px);
      .login-form-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .header {
      padding-top: 40px;
    }
  }
  .login-form {
    position: relative;
    width: 440px;
    max-width: 100%;
    overflow: hidden;
    background: #fff;
    padding: 50px;
    margin-top: 3%;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    text-align: right;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    // color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      // color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: left;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    // color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
