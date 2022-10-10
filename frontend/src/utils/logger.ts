
export const setLogger = (showInfo = true) => {
	if (!showInfo) {
		console.info = () => {};
	}
}

export default setLogger;