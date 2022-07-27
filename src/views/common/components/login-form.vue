<template>
  <a-form
    :model="form"
    :label-col="{ span: 8 }"
    label-align="left"
    autocomplete="off"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item
      :rules="[{ required: true, message: '请输入你的用户名' }]"
      name="username"
      placeholder="账号"
    >
      <a-input v-model:value="form.username" />
    </a-form-item>
    <a-form-item
      :rules="[{ required: true, message: '请输入你的密码' }]"
      placeholder="密码"
      name="password"
    >
      <a-input-password v-model:value="form.password" />
    </a-form-item>
    <a-form-item>
      <div class="btn-group">
        <a-button
          type="info"
          @click="handleToRegisterView"
        >
          去注册
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
        >
          登 录
        </a-button>
      </div>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IUserLogin } from '../../../interfaces/user';
import { useRouter } from 'vue-router';
import { fetchUserLogin } from '../../../services/user';

export default defineComponent({
    name: 'LoginForm',

    setup() {
        const router = useRouter();
        const form = reactive<IUserLogin>({
            username: '',
            password: '',
        });

        const handleFinish = async (value: IUserLogin) => {
            const res = await fetchUserLogin({
                username: value.username,
                password: value.password,
            });
            if (res.code === 200) {
                await router.push({
                    name: 'dashboard-index',
                });
            }
        };

        const handleFinishFailed = (errorInfo: any) => {
            console.log(errorInfo);
        };

        const handleToRegisterView = () => {
            router.push({
                name: 'register',
            });
        };

        return {
            form,
            handleFinish,
            handleFinishFailed,
            handleToRegisterView,
        };
    },
});
</script>
<style lang="less" scoped>
.btn-group {
    display: flex;
    justify-content: space-between;
}
</style>
