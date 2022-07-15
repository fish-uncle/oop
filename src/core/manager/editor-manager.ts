import Factory from '../base/factory'
import shortid from 'shortid'
import Process from '../process/process'
import Node from '../node/node'
import ProcessFactory from './process-factory'
import Approver from '../approver/approver'

export default class EditorManager extends Factory<EditorManager> {
	//当前编辑得流程
	public currentProcess: Process | null = null
	//当前编辑流程中编辑节点
	public currentNode: Node | null = null
	private processFactory: ProcessFactory = ProcessFactory.Instance()

	//编辑器初始化
	public init() {
		this.processFactory.init()
	}

	public createProcess(): Process | null {
		const name = `流程-${Date.now()}`
		this.processFactory.createProcess(name)
		this.currentProcess = this.processFactory.current
		return this.currentProcess
	}

	public selectOneByIndex(index: number) {
		this.processFactory.selectOneByIndex(index)
		this.currentProcess = this.processFactory.current
		return this.currentProcess
	}

	public closeProcess(process: Process, index: number) {
		if (this.currentProcess?.id === process.id) {
			this.currentProcess = null
		}
		this.currentNode = null
		this.processFactory.processList.splice(index, 1)
	}

	public createNode() {
		if (!this.currentNode) {
			console.error('请选择一个节点')
			return
		}
		const node = new Node(shortid.generate(), '子节点')
		node.x = this.currentNode.x
		node.y = this.currentNode.y + 50
		node.root = false
		this.currentProcess?.addNode(this.currentNode, node)
	}

	public getProcessList() {
		return this.processFactory.processList
	}

	public selectNode(node: Node) {
		this.currentNode = node
	}

	public addApprover(approver: Approver) {
		this.currentNode?.approver.push(approver)
	}

	public getJson() {
		if (!this.currentProcess) {
			return console.error('请选择一个流程')
		}
		return this.currentProcess.toJson()
	}

	public destroy() {
		this.currentNode = null
		this.currentProcess = null
		this.processFactory.destroy()
	}
}
