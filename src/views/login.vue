<template>
  <div class="login">
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <img src="../assets/images/login-logo.png" alt="logo" />
      <h1></h1>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="请输入账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-button
        size="large"
        type="primary"
        class="login-btn"
        @click.prevent="handleLogin"
      >
        登 录
      </el-button>
      <div class="login-error" v-show="loginError">{{ loginError }}</div>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span></span>
    </div>
  </div>
</template>

<script setup>
import { JSEncrypt } from "jsencrypt";
import { checkPwd } from "@/utils/rules.js";
import { userStore } from "@/store/userStore.js";
const store = userStore();
const router = useRouter();
const loginError = ref("");
const publicKey = ref("");
const { proxy } = getCurrentInstance();
const loginForm = reactive({
  username: "admin",
  password: "zkln_iva#2022",
});
const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", validator: checkPwd }],
};
onBeforeMount(() => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
});
const getUserInfoFun = async () => {
  try {
    const { data } = await getUserInfo({});
    if (data.code === 200) {
      store.changeUserInfo({
        menus: data.menus,
        user: data.user,
      });
      router.push("/");
    }
  } catch (e) {}
};
const getPublicKeyFun = async () => {
  try {
    const { data } = await getPublicKey({});
    if (data.code === 200) {
      let encryptor = new JSEncrypt(); // 新建JSEncrypt对象
      encryptor.setPublicKey(data.data); // 设置公钥
      loginFun(encryptor.encrypt(loginForm.password));
    }
  } catch (e) {}
};
const loginFun = async (encryptionPassword) => {
  try {
    const { data } = await login({
      username: loginForm.username,
      password: encryptionPassword,
    });
    if (data.code === 200 || data.code === 201) {
      localStorage.setItem("token", data.data.access_token);
      getUserInfoFun();
    } else {
      loginError.value = data.msg;
    }
  } catch (e) {}
};
const handleLogin = () => {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      getPublicKeyFun();
    }
  });
};
</script>
<style lang="scss">
.head {
  top: 0;
  left: 0;
  width: 100%;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.png");
  background-size: 100% 100%;
  .login-form {
    border-radius: 9px;
    background: #ffffff;
    width: 500px;
    height: 560px;
    padding: 25px 25px 5px 25px;
    text-align: center;
    h1 {
      font-weight: 800;
      color: #333333;
      font-size: 28px;
    }
    .el-input {
      margin: 10px auto;
      .el-input__inner {
        height: 54px !important;
        line-height: 54px !important;
      }
      width: 400px;
      background: #f2f6fa;
      border-radius: 4px;
    }
    .el-form-item__error {
      font-weight: 400;
      color: #ff3254;
      font-size: 16px;
      left: 25px;
    }
    .login-btn {
      width: 400px;
      height: 54px;
      background: #00706b;
      border-radius: 4px;
      line-height: 54px;
      margin: 20px auto;
    }
    .login-error {
      font-size: 16px;
      font-weight: 400;
      color: #ff3254;
      width: 400px;
      margin: 20px auto;
      text-align: left;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 15px;
    width: 100%;
    text-align: center;
    letter-spacing: 1px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: 30px;
  }
}
</style>