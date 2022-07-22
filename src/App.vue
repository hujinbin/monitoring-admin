<template>
  <router-view />
</template>

<script lang="ts">
// import { onMounted } from "vue";
// import { useStore } from "store/index";
import { pingNetworks } from "./services";

export default {
  name: "App",
  setup() {
      pingNetworks().then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    });
    // onMounted(() => {
    //   const store = useStore();
    //   store.dispatch("generateRoutes");
    // });
  },
};
</script>

<style></style>
