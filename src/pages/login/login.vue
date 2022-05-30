<template>
  <div class="container">
    <div class="title">
      <h2>云系统后台系统</h2>
    </div>
    <div class="login">
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        :labelCol="{ span: 5, offset: 0 }"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码</a>
        </div>

        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
          <!-- Or -->
          <!-- <a href="">register now!</a> -->
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { loginAsync } from '@/services/sys.service'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

interface FormState {
  username: string
  password: string
  remember: boolean
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const router = useRouter()

const onFinish = async (values: any) => {
  const { data: loginRes } = await loginAsync(values.username, values.password)
  if (loginRes) {
    message.success('登录成功', 3)
    localStorage.setItem('token', loginRes.token)
    router.push('/index')
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(#e66465, #9198e5);
  // background-image: linear-gradient(#e66465, #9198e5);
  // background-image: linear-gradient(#e66465, #9198e5);
  background: #003d4d; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #00c996, #003d4d); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #00c996,
    #003d4d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .title h2 {
    color: #f2f3f7;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login {
    width: 500px;
    height: 300px;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    align-items: center;
    background-color: #f2f3f7;
    .login-form {
      max-width: 500px;
      width: 400px;
      margin: 0 auto;
    }
    .login-form-wrap {
      width: 280px;
      display: flex;
      align-items: center;
      // justify-content: center;
      justify-content: space-between;
      margin: 0 auto;
    }
    .login-form-button {
      width: 400px;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}
</style>
