<template>
	<a-layout-header class="c-header">
		<Icon
			:icon="isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'"
			class="c-header-trigger"
			@click="toggleCollapse"
		/>
		<Breadcrumb class="c-header-breadcrumb" />

		<a-dropdown-button>
			<template #overlay>
				<a-menu @click="handleMenuClick">
					<a-menu-item key="logOut">
						退出登录
					</a-menu-item>
				</a-menu>
			</template>
			<template #icon>
				<UserOutlined />
			</template>
		</a-dropdown-button>

	</a-layout-header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "store/index";
import Breadcrumb from "./breadcrumb.vue";
import { UserOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { useRouter } from "vue-router";

export default defineComponent({
	components: {
		Breadcrumb,
		UserOutlined
	},
	setup() {
		const store = useStore();
		const isCollapse = computed(() => store.state.settings.isCollapse);
		let router = useRouter();
		const toggleCollapse = () => {
			store.commit("TOGGLE_COLLAPSE");
			console.log("isCollapse...", isCollapse.value);
		};

		const handleMenuClick: MenuProps["onClick"] = e => {
			const key = e.key;
			switch (key) {
				case "logOut":
					router.push({ name: "login" });
					break;
				default:
					break;
			}
		};
		return {
			isCollapse,
			toggleCollapse,
			handleMenuClick
		};
	}
});
</script>

<style lang="less" scoped>
.c-header {
	background: #fff;
	padding: 0;
	display: flex;
	align-items: center;

	&-trigger {
		font-size: 18px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;

		&:hover {
			color: #1890ff;
		}
	}

	&-breadcrumb {
		flex: 1;
	}

	.ant-dropdown-button {
		margin-right: 20px;
	}
}
</style>
