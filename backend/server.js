const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);

const { processCommand, addUser } = require('./demo-service.js');

app.get('/api/:command', (req, res) => {
	res.send(processCommand(req.params.command));
});

app.ws('/live-updates', (ws, req) => {
	console.log('Live update WS received');
	addUser(ws);
	console.log('Added User to update list');
});

app.listen(8080);
