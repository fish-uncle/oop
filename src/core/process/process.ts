import ProcessBase from './process-base'
import shortid from 'shortid'
import Node from '../node/node'

interface Iid {
	id: string
}

export default class Process extends ProcessBase {
	constructor(id: string, name: string) {
		super(id, name)
		//初始化流程
		this.init()
	}
	private init() {
		this.nodeList = []
		this.nodeMap = new Map()
		const rootNode = new Node(shortid.generate(), '根节点')
		rootNode.root = true
		rootNode.x = 300
		rootNode.y = 300
		this.nodeList.push(rootNode)
		this.nodeMap.set(rootNode.id, rootNode)
	}

	public addNode(parent: Node, node: Node) {
		parent.children.push(node)
		node.parent = parent
		this.nodeList.push(node)
		this.nodeMap.set(node.id, node)
	}

	public toJson() {
		const data = {
			id: this.id,
			name: this.name,
			root: this.root?.id,
			nodeList: this.formatNodeList(),
		}
		return JSON.stringify(data)
	}

	private formatNodeList(): any {
		const l: any[] = []
		this.nodeList.forEach(n => {
			l.push({
				id: n.id,
				name: n.name,
				children: this.parseIds(n.children),
				approver: this.parseIds(n.approver),
			})
		})
		return l
	}

	private parseIds(list: Iid[]) {
		const l: string[] = []
		list.forEach((e: Iid) => {
			l.push(e.id)
		})
		return l
	}
}
