<template>
  <a-form
    ref="formRef"
    :model="form"
    :label-col="{ span: 8 }"
    :rules="rules"
    label-align="left"
    autocomplete="off"
    @validate="handleValidate"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item
      has-feedback
      name="username"
      placeholder="账号"
    >
      <a-input v-model:value="form.username" />
    </a-form-item>
    <a-form-item
      has-feedback
      placeholder="密码"
      name="password"
    >
      <a-input-password v-model:value="form.password" />
    </a-form-item>
    <a-form-item
      has-feedback
      placeholder="密码"
      name="passwordAgain"
    >
      <a-input-password v-model:value="form.passwordAgain" />
    </a-form-item>
    <a-form-item
      has-feedback
      name="code"
      placeholder="验证码"
    >
      <a-input-search
        v-model:value="form.code"
        @search="handleGetVerityCode"
      >
        <template #enterButton>
          <a-button>
            获取验证码
          </a-button>
        </template>
      </a-input-search>
    </a-form-item>
    <a-form-item>
      <div class="btn-group">
        <a-button
          type="info"
          @click="handleToLoginView"
        >
          去登录
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
        >
          注 册
        </a-button>
      </div>
    </a-form-item>

    <invite-code-dialog
      :visible="dialogVisible"
      @close="handleCloseDialog"
    />
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { IUserRegister } from '../../../interfaces/user';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import InviteCodeDialog from 'comps/InviteCodeDialog/index.vue';
import { fetchUserRegister } from '../../../services/user';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'RegisterForm',

    components: {
        InviteCodeDialog,
    },

    setup() {
        const router = useRouter();
        const formRef = ref<FormInstance>();
        const dialogVisible = ref(false);

        interface IUserRegisterForm extends IUserRegister {
            passwordAgain: string;
        }

        const form = reactive<IUserRegisterForm>({
            username: '',
            password: '',
            passwordAgain: '',
            code: '23456789ABCDEFGHJKLMNPQRSTUVWXYZ',
        });

        const handleToLoginView = () => {
            router.push({
                name: 'login',
            });
        };

        const handleFinish = async (value: any) => {
            const res = await fetchUserRegister({
                username: value.username,
                password: value.password,
                code: value.code,
            });
            console.log(res);
            if (res.code === 200) {
                handleToLoginView();
            } else {

            }
        };

        const handleFinishFailed = (errorInfo: any) => {
            console.log(errorInfo);
        };

        const validatePwd = async (_rule: Rule, value: string) => {
            console.log(value);
            if (value === '') {
                return Promise.reject('请输入密码');
            }
            if (form.passwordAgain !== '') {
                formRef.value.validateFields('passwordAgain');
            }
            return Promise.resolve();
        };

        const validatePwdAgain = async (_rule: Rule, value: string) => {
            if (value === '') {
                return Promise.reject('请再次输入密码');
            } if (value !== form.password) {
                return Promise.reject('两次密码输入不一致');
            }
            return Promise.resolve();
        };

        const rules: Record<string, Rule[]> = {
            username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
            code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
            password: [{ required: true, validator: validatePwd, trigger: 'change' }],
            passwordAgain: [{ required: true, validator: validatePwdAgain, trigger: ['change', 'blur'] }],
        };

        const handleValidate = (...args: any) => {
            console.log(args);
        };

        const handleCloseDialog = () => {
            dialogVisible.value = false;
        };

        const handleGetVerityCode = () => {
            dialogVisible.value = true;
        };

        return {
            formRef,
            form,
            rules,
            dialogVisible,
            handleFinish,
            handleFinishFailed,
            handleValidate,
            handleCloseDialog,
            handleToLoginView,
            handleGetVerityCode,
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
