<template>
    <div class="alarm-management-list">
        {{ pageName }}
    </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const _$router = useRouter()
        const pageName = computed(() => _$router.currentRoute.value.meta.title)

        return {
            _$router,
            pageName
        }
    }
}
</script>

<style lang="less" scoped></style>
