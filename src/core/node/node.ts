import NodeBase from './node-base'
import Approver from '../approver/approver'

export default class Node extends NodeBase {
	public children: Node[]
	public parent: Node | null = null
	public root: boolean = false
	public processId: string = ''
	public approver: Approver[] = []
	constructor(id: string, name: string) {
		super(id, name)
		this.children = []
		this.approver = []
	}
}
