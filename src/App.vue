<template>
  <router-view />
</template>

<script lang="ts">
// import { onMounted } from "vue";
// import { useStore } from "store/index";
import axios from "axios";


export default {
  name: "App",
  setup() {
     axios({
                method: 'get',
                url:'/api/ping',
            })
                .then(res => {
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
