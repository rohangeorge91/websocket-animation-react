export interface WorkerInterface {
	postMessage: Function,
	cleanUp: Function,
	worker: SharedWorker,
	broadcastChannel: BroadcastChannel
}

export const makeWorker = (
	workerFileName: string | URL,
	broadcastChannelStr: string,
	processMessage: Function,
	dispatchFunction: Function) : WorkerInterface => {
	const broadcastChannel = new BroadcastChannel(broadcastChannelStr);
	const worker = new SharedWorker(workerFileName);
	broadcastChannel.addEventListener('message', (e) => {
		const newData = processMessage(e.data);
		dispatchFunction(newData)
	});

	return ({
		postMessage: (data: any) => { 
			worker.port.postMessage(data);
		},
		cleanUp: () => {
			console.info('removing dead resource');
			worker.removeEventListener('message', (e) => {
				console.warn("issue while removing message listener", e);
			});
		},
		worker,
		broadcastChannel
	});
}

export default makeWorker;
