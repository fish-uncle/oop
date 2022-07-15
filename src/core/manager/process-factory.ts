import Factory from '../base/factory'
import Process from '../process/process'
import shortid from 'shortid'

export default class ProcessFactory extends Factory<ProcessFactory> {
	public current: Process | null = null
	public processList: Array<Process> = []
	//初始化
	public init() {
		this.processList = []
	}
	// 创建一条流程
	public createProcess(name: string) {
		const process: Process = new Process(shortid.generate(), name)
		this.processList.push(process)
		if (!this.current) this.current = process
	}

	public selectOneByIndex(index: number) {
		this.current = this.processList[index]
	}

	public destroy() {
		this.current = null
		this.processList = []
	}
}
