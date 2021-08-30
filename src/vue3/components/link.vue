<template lang="pug">
g(
	v-if="node.children && node.children.length > 0",
	:transform="`translate(${node.x},${node.y})`")
	line.link(
		v-for="c in node.children",
		:key="c.id",
		:x1="0",
		:y1="0",
		:x2="c.x - node.x",
		:y2="c.y - node.y",
		style="stroke: #006600")
</template>
<script lang="ts">
import EditorManager from '@/core/manager/editor-manager'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
	name: 'o-link',
	props: ['node'],
	setup() {
		const editor: EditorManager = EditorManager.Instance()
		const state = reactive({ editor })
		return {
			...toRefs(state),
		}
	},
})
</script>

<style lang="scss" scoped>
.link {
}
</style>
