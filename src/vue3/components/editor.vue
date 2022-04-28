<template lang="pug">
.header
	.button-group
		el-button(@click="onCreate") 新建流程
		el-button(@click="onSave") 保存
	.button-group(v-if="editor.currentNode")
		el-button(@click="onCreateNode") 新建节点
el-empty(v-if='!processes.length' content='暂无数据')
.tab-list(v-if='processes.length')
	.tab-list-item(
		v-for="(p, index) in processes",
		:class="{ current: current && current.id === p.id }",
		:key="p.id",
		@click="onSelect(index, p)")
		span {{ p.name }}
		i.el-icon-close(@click.stop="onCloseProcess(p, index)")
.content(v-if='processes.length')
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
			current: null,
			editor,
			employee,
		})
		const onCreate = () => {
			;(state.current as any) = state.editor.createProcess()
		}
		const onSelect = index => {
			;(state.current as any) = state.editor.selectOneByIndex(index)
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
			;(state.processes as any) = state.editor.getProcessList()
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
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
	overflow: hidden;
}
#app {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
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
			box-sizing: border-box;
			flex: none;
			width: 240px;
			padding: 10px;
			border-left: 1px solid #ddd;
			.label {
				margin: 10px 0;
				font-size: 14px;
			}
		}
	}
	.tab-list {
		display: flex;
		height: 24px;
		border-bottom: 1px solid #ddd;
		.tab-list-item {
			max-width: 240px;
			height: 24px;
			padding: 0 10px;
			font-size: 12px;
			line-height: 24px;
			color: #ccc;
			cursor: pointer;
			user-select: none;
			&.current {
				color: #fff;
				background: #2777df;
				&:hover {
					color: #fff;
				}
			}
			&:hover {
				color: #2777df;
			}
		}
	}
}
</style>
