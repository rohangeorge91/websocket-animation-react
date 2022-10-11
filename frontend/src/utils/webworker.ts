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
		// NOTE: the process of message will happen on the worker and not on the main UI thread this should be a better
		// design approach than stalling the UI thread with heavy operations.
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
