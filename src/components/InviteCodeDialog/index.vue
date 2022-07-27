<template>
  <a-modal
    v-model:visible="visible"
    :closable="false"
    size="small"
    title="获取邀请码"
  >
    <div class="content">
      <p class="title">
        微信号：hevanh
      </p>
      <img
        src="./img.png"
        alt=""
      >
    </div>
    <template #footer>
      <a-button
        type="primary"
        @click="handleOk"
      >
        知道了
      </a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'InviteCodeDialog',

    props: {
        visible: {
            type: Boolean,
            default() {
                return false;
            },
        },
    },

    setup(prop, ctx) {
        const { emit } = ctx;

        const handleOk = () => {
            emit('close');
        };

        return {
            handleOk,
        };
    },
});
</script>

<style lang="less" scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .title {
        font-weight: bold;
    }
}
</style>
