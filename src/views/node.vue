<template lang="pug">
g.node(
	v-if="node",
	:transform="`translate(${node.x},${node.y})`",
	@mousedown="onStart")
	rect(x="-40", y="-15", width="80", height="30", :style="nodeStyle")
	text(x="-40", width="80", height="30", fill="#ffffff") {{ node.name }}
</template>

<script>
import EditorManager from '@/core/manager/editor-manager'
export default {
	name: 'o-node',
	props: ['node'],
	data() {
		return {
			editor: EditorManager.Instance(),
		}
	},
	computed: {
		nodeStyle() {
			const currentNode = this.editor.currentNode
			if (currentNode && currentNode.id === this.node.id) {
				return {
					fill: 'rgb(0, 0, 255)',
					stroke: '#ff0000',
					'stroke-width': 3,
				}
			} else {
				return {
					fill: 'rgb(0, 0, 255)',
					stroke: '#006600',
					'stroke-width': 3,
				}
			}
		},
	},
	created() {
		this._sx = 0
		this._sy = 0
		this._dx = 0
		this._dy = 0
	},
	beforeDestroy() {
		window.removeEventListener('mousemove', this.onMove)
		window.removeEventListener('mouseup', this.onStop)
	},
	methods: {
		onStart(e) {
			this._sx = e.clientX
			this._sy = e.clientY
			this._dx = this.node.x
			this._dy = this.node.y
			window.addEventListener('mousemove', this.onMove)
			window.addEventListener('mouseup', this.onStop)
		},
		onMove(e) {
			this.node.x = e.clientX - (this._sx - this._dx)
			this.node.y = e.clientY - (this._sy - this._dy)
		},
		onStop(e) {
			this.node.x = e.clientX - (this._sx - this._dx)
			this.node.y = e.clientY - (this._sy - this._dy)
			window.removeEventListener('mousemove', this.onMove)
			window.removeEventListener('mouseup', this.onStop)
		},
	},
}
</script>

<style lang="scss" scoped>
.node {
	user-select: none;
	cursor: move;
}
</style>
