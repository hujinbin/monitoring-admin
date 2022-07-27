<template>
  <a-modal
    v-model:visible="dialogVisible"
    size="small"
    title="获取邀请码"
    @ok="handleOk"
  >
    <p>微信号：hevanh</p>
    <img
      src="./img.png"
      alt=""
    >
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
        const dialogVisible = ref(prop.visible);

        console.log(dialogVisible, 'dialogVisible');

        const handleOk = (e: MouseEvent) => {
            console.log(e);
            emit('close');
        };

        return {
            dialogVisible,
            handleOk,
        };
    },
});
</script>

<style lang="less" scoped>

</style>
