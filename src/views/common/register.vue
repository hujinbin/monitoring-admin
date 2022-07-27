<template>
  <div class="register-container">
    <h1>Monitor App</h1>
    <register-form
      class="register-box"
    />
  </div>
</template>

<script lang="ts">
import RegisterForm from './components/register-form.vue';
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'RegisterView',
    components: {
        RegisterForm,
    },
});
</script>

<style lang="less" scoped>
.register-container {
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
