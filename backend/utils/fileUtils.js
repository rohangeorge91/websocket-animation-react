const fs = require('fs');
const path = require('path');
const FILE_OPTIONS = { encoding: 'utf-8' };

const readData = (filepath) => {
	const fileLookup = path.join(__dirname, '..' ,filepath);
	return JSON.parse(fs.readFileSync(fileLookup, FILE_OPTIONS));
}

const writeData = (filepath, data) => {
	const fileLookup = path.join(__dirname, '..', filepath);
	fs.writeFileSync(fileLookup, JSON.stringify(data, null, 2), FILE_OPTIONS);
}

module.exports = { readData, writeData };
