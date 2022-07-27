<template>
  <div class="login-container">
    <h1>Monitor App</h1>
    <login-form
      class="login-box"
    />
  </div>
</template>

<script lang="ts">
import LoginForm from './components/login-form.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoginView',
    components: {
        LoginForm,
    },
});
</script>

<style lang="less" scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #001529;

    h1 {
        color: #ffffff;
        margin-bottom: 24px;
    }

    .wrapper {
        padding: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f0f2f5;
    }
}
</style>
