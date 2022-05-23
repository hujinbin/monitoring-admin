<template>
<div class="login-container">
  <div id="login_box">
    <h2>LOGIN</h2>
    <div id="input_box">
      <input type="text" v-model="userName" placeholder="请输入用户名">
    </div>
    <div class="input_box">
      <input type="password" v-model="possword" placeholder="请输入密码">
    </div>
    <button @click="onLogin">登录</button><br>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from "vue-router";
export default defineComponent({
    setup() {
      const userName = ref<string>('test');
      const possword = ref<string>('123456');
      let router = useRouter();
      const onLogin = ()=>{
          router.push('/')
      }
        return {
userName,
possword,
onLogin,
        }
    }
})
</script>

<style scoped>
 .login-container {
      background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat center center;
      background-size: cover;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }

    #login_box {
      width: 400px;
      height: 400px;
      background-color: #00000060;
      margin: auto;
      margin-top: 10%;
      text-align: center;
      border-radius: 10px;
      padding: 50px 50px;
    }

    h2 {
      color: #ffffff90;
      margin-top: 5%;
    }

    #input-box {
      margin-top: 5%;
    }

    span {
      color: #fff;
    }

    input {
      border: 0;
      width: 60%;
      font-size: 15px;
      color: #fff;
      background: transparent;
      border-bottom: 2px solid #fff;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
    }

    button {
      margin-top: 50px;
      width: 60%;
      height: 30px;
      border-radius: 10px;
      border: 0;
      color: #fff;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      cursor: pointer;
      background-image: linear-gradient(to right, #30cfd0, #330867);
    }

    #sign_up {
      margin-top: 45%;
      margin-left: 60%;
    }

    a {
      color: #b94648;
    }
</style>