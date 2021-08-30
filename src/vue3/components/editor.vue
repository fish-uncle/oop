<template lang="pug">
.header
	.button-group
		el-button(@click="onCreate") 新建流程
		el-button(@click="onSave") 保存
	.button-group(v-if="editor.currentNode")
		el-button(@click="onCreateNode") 新建节点
.tab-list
	.tab-list-item(
		v-for="(p, index) in processes",
		:class="{ current: current && current.id === p.id }",
		:key="p.id",
		@click="onSelect(index, p)")
		span {{ p.name }}
		i.el-icon-close(@click.stop="onCloseProcess(p, index)")
.content
	svg(
		v-if="editor.currentProcess",
		version="1.1",
		xmlns="http://www.w3.org/2000/svg")
		o-link(v-for="n in current.nodeList", :key="'l' + n.id", :node="n")
		o-node(
			v-for="n in current.nodeList",
			:key="n.id",
			:node="n",
			@click.native="onSelectNode(n)")
	.right-panel
		.right-panel-content(v-if="editor.currentNode")
			.label 流程名称：
			el-input(v-model="editor.currentNode.name")
			.label 审批人：
			el-select(
				v-model="editor.currentNode.approver",
				multiple,
				placeholder="请添加审核人")
				el-option(
					v-for="e in employee",
					:key="e.id",
					:label="e.name",
					:value="e.id")
</template>
<script lang="ts">
import EditorManager from '@/core/manager/editor-manager'
import ONode from '@/vue3/components/node.vue'
import OLink from '@/vue3/components/link.vue'
import { employee } from '@/vue3/data'
import { defineComponent, reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
	name: 'app',
	components: { ONode, OLink },
	setup() {
		const editor: EditorManager = EditorManager.Instance()
		const state = reactive({
			processes: [],
			current: '',
			editor,
			employee,
		})
		const onCreate = () => {
			state.current = state.editor.createProcess()
		}
		const onSelect = index => {
			state.current = state.editor.selectOneByIndex(index)
		}
		const onCloseProcess = (process, index) => {
			state.editor.closeProcess(process, index)
			state.current = null
		}
		const onSelectNode = node => {
			state.editor.selectNode(node)
		}
		const onCreateNode = () => {
			state.editor.createNode()
		}
		const onSave = () => {
			console.log(/save/, state.editor.getJson())
		}
		onMounted(() => {
			state.editor.init()
			state.processes = state.editor.getProcessList()
		})
		onBeforeUnmount(() => {
			state.current = null
			state.editor.destroy()
		})
		return {
			...toRefs(state),
			onCreate,
			onSelect,
			onCloseProcess,
			onSelectNode,
			onCreateNode,
			onSave,
		}
	},
})
</script>
<style lang="scss">
body {
	margin: 0;
	padding: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	.header {
		display: flex;
		flex: none;
		padding: 10px;
		border-bottom: 1px solid #ddd;
		.button-group {
			margin-right: 30px;
		}
	}
	.content {
		display: flex;
		flex: 1;
		width: 100%;
		overflow: hidden;
		svg {
			flex: 1;
			height: 100%;
		}
		.right-panel {
			flex: none;
			width: 240px;
			border-left: 1px solid #dddddd;
			box-sizing: border-box;
			padding: 10px;
			.label {
				margin: 10px 0;
				font-size: 14px;
			}
		}
	}
	.tab-list {
		display: flex;
		border-bottom: 1px solid #ddd;
		height: 24px;
		.tab-list-item {
			user-select: none;
			font-size: 12px;
			max-width: 240px;
			color: #cccccc;
			line-height: 24px;
			height: 24px;
			padding: 0 10px;
			cursor: pointer;
			&.current {
				background: #2777df;
				color: #ffffff;
				&:hover {
					color: #ffffff;
				}
			}
			&:hover {
				color: #2777df;
			}
		}
	}
}
</style>
