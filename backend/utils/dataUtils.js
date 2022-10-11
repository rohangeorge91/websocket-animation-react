const stringOfData = (data) => JSON.stringify(data);

const returnSmaller = (data1, data2) => data1 <= data2 ? data1 : data2;

const returnBigger = (data1, data2) => data1 >= data2 ? data1 : data2;

module.exports = {
	stringOfData,
	returnSmaller,
	returnBigger
};
