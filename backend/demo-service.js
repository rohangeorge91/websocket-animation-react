const { readData, writeData } = require('./utils/fileUtils.js')
const { responseJSON } = require('./utils/responseUtils.js');
const { stringOfData, returnSmaller, returnBigger } = require('./utils/dataUtils.js');

const listeners = [];

const MIN_TIME = 1;
const MAX_TIME = 10000;
const DEFAULT_TIME = 1000;
const LOOKUP_FILE = 'source-of-truth/data.json';
let time = DEFAULT_TIME;
let processTimer = 0;

const modifyWithRandomData = (oldData) => {
	const lookupIndex = Math.floor(Math.random() * 10);
	const points = Math.floor(Math.random() * 100);

	const newData = oldData.map((datum, index) => (index === lookupIndex)
		? ({
			...datum,
			score: datum.score + points
		}) : datum);
	return newData;
}

const resetScoreData = () => {
	const oldData = readScore();
	const newData = oldData.map((datum, index) => ({ ...datum, score: 0 }));
	writeData(LOOKUP_FILE, newData);
	const timestamp = (new Date()).getTime();
	listeners.forEach((user) => {
		const websocket = user.websocket;
		if (websocket?.send) {
			websocket.send(stringOfData({ timestamp, data: newData }));
		}
	});
	return responseJSON(200, 'reset user scores to 0');
};
	

const readScore = () => readData(LOOKUP_FILE);

const sendDataToAllListener = () => {
	const data = readScore();
	const newData = modifyWithRandomData(data);
	writeData(LOOKUP_FILE, newData);
	const timestamp = (new Date()).getTime();
	listeners.forEach((user) => {
		const websocket = user.websocket;
		if (websocket?.send) {
			websocket.send(stringOfData({ timestamp, data: newData }));
		}
	});
}

const start = () => {
	if (processTimer === 0) {
		processTimer = setInterval(() => sendDataToAllListener(), time);
		return responseJSON(200, 'started');
	}
	return responseJSON(200, 'already running');
}

const stop = () => {
	if (processTimer !== 0) {
		clearInterval(processTimer);
		processTimer = 0;
		return responseJSON(200, 'stopped');
	}
	return responseJSON(200, 'nothing to stop');
}

const changeTime = (newTime) => {
	time = newTime;
	if (processTimer !== 0) {
		stop();
		start();
	}
	return responseJSON(200, `change to ${newTime}`);
}

const removeUser = (userId) => {
	const index = listeners.findIndex((listener) => listener.userId === userId);
	if (index !== -1) {
		listeners.splice(index, 1);
	}
}

const addUser = (websocket) => {
	const userId = `${Math.floor(Math.random() * 10000)}-${(new Date()).getTime()}`;
	if (websocket) {
		listeners.push({ userId, websocket });
		websocket.on('close', () => {
			console.log(`userId:${userId} closed connection`);
			removeUser(userId);
		});
		websocket.on('error', (error) => {
			console.error(`userId:${userId} had error.`, error);
		});
		setTimeout(() => {
			console.log(`Added userId:${userId} send first data`);
			const timestamp = (new Date()).getTime();
			websocket.send(stringOfData({ timestamp, data: readScore() }));
		}, 0);
	}
}

const processCommand = (command) => {
	switch (command) {
		case 'start':
			return start();
		case 'stop':
			return stop();
		case 'resetScore':
			return resetScoreData();
		case 'resetTime':
			return changeTime(DEFAULT_TIME);
		case 'slowest':
			return changeTime(MAX_TIME);
		case 'slower': {
			const newTime = parseInt((time + 100), 10);
			return changeTime(returnSmaller(newTime, MAX_TIME));
		}
		case 'slowerBy2': {
			const newTime = parseInt((time * 2), 10);
			return changeTime(returnSmaller(newTime, MAX_TIME));
		}
		case 'faster': {
			const newTime = parseInt((time - 100), 10);
			return changeTime(returnBigger(newTime, MIN_TIME));
		}
		case 'fasterBy2': {
			const newTime = parseInt((time / 2), 10);
			return changeTime(returnBigger(newTime, MIN_TIME));
		}
		case 'fastest':
			return changeTime(MIN_TIME);
		default:
			return responseJSON(500, `command : ${command} is not found.`);
	}
}

module.exports = {
	addUser,
	processCommand
};
