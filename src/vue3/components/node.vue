<template lang="pug">
g.node(
	v-if="node",
	:transform="`translate(${node.x},${node.y})`",
	@mousedown="onStart")
	rect(x="-40", y="-15", width="80", height="30", :style="nodeStyle")
	text(text-anchor="middle" width="80", height="30", fill="#333333") {{ node.name }}
</template>
<script lang="ts">
import EditorManager from '@/core/manager/editor-manager'
import { reactive, toRefs, defineComponent, onBeforeUnmount, computed } from 'vue'

export default defineComponent({
	name: 'o-node',
	props: ['node'],
	setup(props) {
		const editor: EditorManager = EditorManager.Instance()
		const state = reactive({ editor, sx: 0, sy: 0, dx: 0, dy: 0 })

		const onStart = e => {
			state.sx = e.clientX
			state.sy = e.clientY
			state.dx = props.node.x
			state.dy = props.node.y
			window.addEventListener('mousemove', onMove)
			window.addEventListener('mouseup', onStop)
		}
		const onMove = e => {
			props.node.x = e.clientX - (state.sx - state.dx)
			props.node.y = e.clientY - (state.sy - state.dy)
		}
		const onStop = e => {
			props.node.x = e.clientX - (state.sx - state.dx)
			props.node.y = e.clientY - (state.sy - state.dy)
			window.removeEventListener('mousemove', onMove)
			window.removeEventListener('mouseup', onStop)
		}

		const nodeStyle = computed(() => {
			const currentNode = state.editor.currentNode
			if (currentNode && currentNode.id === props.node.id) {
				return {
					fill: 'rgb(255, 255, 255)',
					stroke: '#8ae0fb',
					'stroke-width': 2,
				}
			} else {
				return {
					fill: 'rgb(255, 255, 255)',
					stroke: '#ddd',
					'stroke-width': 2,
				}
			}
		})

		onBeforeUnmount(() => {
			window.removeEventListener('mousemove', onMove)
			window.removeEventListener('mouseup', onStop)
		})

		return {
			...toRefs(state),
			onStart,
			onMove,
			onStop,
			nodeStyle,
		}
	},
})
</script>
<style lang="scss" scoped>
.node {
	user-select: none;
	cursor: move;
}
</style>
