export interface SocketInterface {
	attach: Function,
	cleanup: Function
}

let port: { stop: () => void; } | null = null;

export const makeSocket = (url: string | URL, broadcastChannelStr: string): SocketInterface => {
	const ws = new WebSocket(url);
	const bc = new BroadcastChannel(broadcastChannelStr);

	ws.addEventListener("open", (e) => {
		console.info("Socket Open");
	});

	ws.addEventListener("message", (e) => {
		console.info('SharedWorker received data: ', e.data);
		bc.postMessage(e.data);
	});

	return {
		attach: (self: any) => {
			// eslint-disable-next-line no-restricted-globals
			self.addEventListener("connect", (e: Event & { ports: any[] }) => {
				const port = e.ports[0];

				port.addEventListener("message", (e: { data: string | ArrayBufferLike | Blob | ArrayBufferView; }) => {
					console.info('SharedWorker received data: ', e.data);
					ws.send(e.data);
				});

				port.start(); // addEventListenerを使用する場合に必要、onmessageを使う場合は暗黙的に呼び出される
			})
		},
		cleanup: () => {
			port?.stop();
		}
	};
}

export default makeSocket;
