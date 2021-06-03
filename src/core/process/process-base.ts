import Node from '../node/node'

export default class ProcessBase {
	public id: string
	public name: string
	public root: Node | null = null
	public nodeList: Node[]
	public nodeMap: Map<string, Node>
	public creater: string = ''
	public createrId: string = ''
	public type: string = ''
	constructor(id: string, name: string) {
		this.id = id
		this.name = name
		this.nodeList = []
		this.nodeMap = new Map()
	}
}
