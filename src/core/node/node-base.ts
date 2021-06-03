export default class NodeBase {
	public id: string
	public name: string
	public data: any
	public x: number
	public y: number
	constructor(id: string, name: string) {
		this.id = id
		this.name = name
		this.data = {}
		this.x = 0
		this.y = 0
	}
}
