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

<script>
import EditorManager from '@/core/manager/editor-manager'
export default {
	name: 'o-link',
	components: {},
	props: ['node'],
	data() {
		return {
			editor: EditorManager.Instance(),
		}
	},
}
</script>

<style lang="scss" scoped>
.link {
}
</style>
