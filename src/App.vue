<template>
    <router-view />
</template>

<script lang="ts">
import { pingNetworks } from './services'

export default {
    name: 'App',
    setup() {
        pingNetworks()
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
</script>

<style></style>
