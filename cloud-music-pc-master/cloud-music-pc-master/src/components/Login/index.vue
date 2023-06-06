<template>
  <div class="login">
    <!-- 手机验证码登录 -->
    <div class="telLogin" v-if="!isQRCodeLogin">
      <!-- 建议二维码登录 -->
      <div class="suggest" @click="toQRCodeLogin">
        <!-- 二维码图片 -->
        <img src="./img/QRcode.png" alt="" />
        <!-- 文字提示 -->
        <span>扫码登录更安全!</span>
      </div>
      <!-- LOGO -->
      <div class="logo">
        <img src="./img/logo.jpg" alt="" />
      </div>
      <!-- 手机号验证码表单 -->
      <el-form :model="loginForm" status-icon :rules="loginRule" label-width="auto" class="loginForm">
        <el-form-item label="手机号：" prop="telphone">
          <el-input v-model.trim="loginForm.telphone" type="input" placeholder="请输入您的手机号码" />
        </el-form-item>
        <el-form-item class="captcha" label="验证码：" prop="captcha">
          <el-input v-model.trim="loginForm.captcha" type="input" placeholder="输入验证码" />
          <el-button @click="getLoginCaptcha">
            {{canGetCaptcha ? '获取验证码' : `${waitTime}s`}}
          </el-button>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-button @click="loginOfCaptcha" class="loginBtn">登录</el-button>
      </el-form>
      <!-- 选择密码登录 -->
      <div class="passwordLogin">
        <span @click="ElMessage.warning('网易云现在不能直接用密码登录!')">
          密码登录
        </span>
      </div>
    </div>
    <!-- 二维码扫码登录 -->
    <div class="QRCodeLogin" v-else>
      <div class="title">扫码登录</div>

      <!-- 扫码图片部分 -->
      <div class="scanfArea" v-show="
        QRCodeStateCode === 0 ||
        QRCodeStateCode === 800 ||
        QRCodeStateCode === 801
      ">
        <!-- 提示图片 -->
        <div class="hintImg">
          <img src="./img/hint.png" alt="" />
        </div>
        <!-- 二维码 -->
        <div class="QRCode">
          <img :src="QRCodeBase" alt="" />
          <!-- 提示内容 -->
          <p class="hint">使用网易云音乐App扫码登录</p>
        </div>
      </div>

      <!-- 二维码失效刷新 -->
      <div class="QRCodeInvalid" v-show="QRCodeStateCode === 800">
        <el-button type="danger" size="small" @click="updateQRCode">刷新二维码</el-button>
      </div>

      <!-- 扫码确认待确认 -->
      <div class="waitConfirm">
        <img src="./img/waitConfirm.png" v-show="QRCodeStateCode === 802" alt="" />
      </div>

      <!-- 返回手机验证码登录 -->
      <div class="selectOther" @click="isQRCodeLogin=false">选择其他登录方式</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getQRCodeKeyApi, getQRCodeBaseApi, checkQRCodeStateApi, sendCaptchaApi,
  telLoginApi, checkCaptchaApi
} from '@/api/login'
import { useRouter } from 'vue-router';
const router = useRouter()
const { closeDialog } = defineProps(['closeDialog'])

let loginForm = reactive({
  telphone: '',
  captcha: ''
})

// 登录校验规范
const loginRule = reactive({
  telphone: [
    { required: true, message: '手机号必填', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '验证码必填', trigger: 'blur' },
  ],
})

// 当前能否获取验证码
let canGetCaptcha = ref(true)
let waitTime = ref(0) //等待时间

// 获取验证码
async function getLoginCaptcha() {
  if (loginForm.telphone.length < 8) {
    ElMessage.warning(`手机号格式不合法`)
    return false
  }
  if (!canGetCaptcha.value) {
    ElMessage.warning(`再等待${waitTime.value}s`)
    return false
  }
  const res: any = await sendCaptchaApi(loginForm.telphone)
  if (res.code == 200) {
    canGetCaptcha.value = false
    waitTime.value = 60
    ElMessage.success('短信发送成功')
    // 到达时间放开限制
    const timer = setInterval(() => {
      waitTime.value--
      if (waitTime.value == 0) {
        canGetCaptcha.value = true
        clearInterval(timer)
      }
    }, 1000)
  } else {
    ElMessage.warning('未知错误')
  }
}

// 验证码登录
async function loginOfCaptcha() {
  // 先验证格式
  if (loginForm.telphone.length < 8 && loginForm.captcha.length < 4) {
    ElMessage.warning(`格式不正确`)
  }
  // 在检验验证码是否正确
  try {
    const isValid: any = await checkCaptchaApi(loginForm.telphone, loginForm.captcha)
    if (isValid.code == 200) {
      const res: any = await telLoginApi(loginForm.telphone, loginForm.captcha)
      localStorage.setItem('cookie', res.cookie)
      localStorage.setItem('token', res.token)
      console.log(res)
      ElMessage.success('登录成功')
      closeDialog()
    }
  }catch{
    ElMessage.warning('服务器异常！')
  }
}

// 是否使用二维码登录
let isQRCodeLogin = ref(false)
// 二维码的Base64值
let QRCodeBase = ref('')
// 二维码的状态值
let QRCodeState = ref({})
// 二维码的状态码
let QRCodeStateCode = ref(0)
// 监测二维码状态的定时器
let checkTimer: NodeJS.Timer

// 切换二维码登录
async function toQRCodeLogin() {
  // 先生成二维码
  const key = await getQRCodeKey()
  await getQRCodeBase(key)
  isQRCodeLogin.value = true
  // 防抖
  checkTimer || clearInterval(checkTimer)
  // 开启定时器，定时检测二维码的扫描状态
  checkTimer = setInterval(async () => {
    await checkQRCodeState(key)
  }, 1000)
}

// 获取二维码key值
async function getQRCodeKey() {
  const res = await getQRCodeKeyApi()
  return res.data.unikey
}

// 生成二维码Base值
async function getQRCodeBase(key: string) {
  // 每次重新获取二维码时，将二维码的状态值重置
  QRCodeState.value = {}
  QRCodeStateCode.value = 0
  // 通过key获取二维码的 base64 编码
  const res = await getQRCodeBaseApi(key)
  QRCodeBase.value = res.data.qrimg
}

//检测二维码状态是否过期
async function checkQRCodeState(key: string) {
  const res: any = await checkQRCodeStateApi(key)
  // 如果状态码改变了
  if (res.code !== QRCodeStateCode.value) {
    console.log(res)
    if (res.code === 800) {
      clearInterval(checkTimer)
      ElMessage.warning('二维码已过期')
    } else if (res.code === 802) {
      ElMessage.success('扫码成功，请确认是否登录')
    } else if (res.code === 803) {
      clearInterval(checkTimer)
      ElMessage.success('登录成功')
      closeDialog()
      // 刷新页面
      router.go(0)
    }
    // 将获取到的 cookie 保存在 sessionStorage 中
    localStorage.setItem('cookie', res.cookie)
    // 储存新的状态码状态码和状态值
    QRCodeStateCode.value = res.code
    QRCodeState.value = res
  }
}

// 刷新二维码
function updateQRCode() {
  toQRCodeLogin().then(() => ElMessage.success('刷新成功！'))
}

</script>

<style lang="less" scoped>
.login {
  .telLogin {
    padding: 0 0.5rem;

    .suggest {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
      }

      span {
        margin: 20px;
        height: 40px;
        background-color: #aaa;
        border-radius: 10px;
        color: white;
        padding: 0 15px;
        line-height: 40px;
        font-size: 15px;
      }
    }

    .logo {
      display: flex;
      justify-content: center;
      margin: 2.5rem 0;

      img {
        width: 80px;
        height: 80px;
      }
    }

    .loginForm {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 1rem 0;

      .captcha {
        display: flex;

        .el-input {
          width: 120px;
        }

        .el-button {
          font-size: 10px;
          margin-left: 1rem;
        }
      }

      .loginBtn {
        width: 8rem;
        margin: 0.5rem auto;
        background-color: #db4242;
        color: white;
        font-size: 18px;
        font-weight: 500;
      }
    }

    .passwordLogin {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      cursor: pointer;

      &:active {
        color: #aaa;
      }
    }
  }

  .QRCodeLogin {
    padding: 0 10px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 20px;
      color: #000;
      text-align: center;
      position: absolute;
      top: 1rem;
      left: 40%;
    }

    .scanfArea {
      display: flex;
      flex-direction: column;
      align-items: center;

      .hintImg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        height: 250px;
        transition: 0.5s;

        img {
          height: 100%;
        }
      }

      .QRCode {
        transition: 0.5s;
        height: 100px;
        width: 220px;

        img {
          width: 100%;
          transition: 0.5s;
        }

        .hint {
          white-space: normal;
          text-align: center;
          line-height: 25px;
          font-size: 16px;
        }
      }

      &:hover {
        .hintImg {
          opacity: 1;
          transform: translate(-150px, -150px);
        }

        .QRCode {
          transform: scale(0.7) translate(150px, 25px);
        }
      }
    }

    .QRCodeInvalid {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      font-size: 12px;
    }

    .waitConfirm {
      padding: 1rem;

    }

    .selectOther {
      position: absolute;
      bottom: 2rem;
      font-size: large;
      color: skyblue;
      cursor: pointer;

      &:active {
        color: #aaa;
      }
    }
  }
}
</style>