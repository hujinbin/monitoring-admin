<template>
  <img
    alt="Vue logo"
    src="../assets/logo.png"
  >
  <h1>{{ msg }}</h1>
  <button
    type="button"
    @click="increment"
  >
    count is: {{ count }}
  </button>
  <a-button
    type="primary"
    @click="increment"
  >
    count is: {{ count }}
  </a-button>
  <a-radio checked>
    Radio
  </a-radio>
  <a-checkbox checked>
    Checkbox
  </a-checkbox>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// 注意此处，引入的useStore为自定义的，而不是vuex默认导出的；为了引入方便，此处需要配置别名
// import { useStore } from 'vuex'
import { useStore } from 'store/index';

export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: {
            type: String,
            // required: true,
            default: 'Hello Vue 3 + TypeScript + Vite',
        },
    },
    setup: () => {
        const store = useStore();
        return {
            count: computed(() => store.state.app.count),
            increment: () => store.commit('increment'),
        };
    },
});
</script>

<style scoped></style>
