import { SetStateAction, useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const Points = styled.div({
	'&::after': {
		content: '"pt"',
		marginLeft: '5px',
	},
	minWidth: '120px',
	textAlign: 'right'
});

const makeLetsCountInstance: Function = () => {
	let intervalRef: NodeJS.Timeout | null | undefined = null;
	let lastValueRef = -1;
	const letsCount = (lastValue: number, newValue: number, setCurrentValue: Function) => {
		if (lastValueRef === -1) {
			lastValueRef = lastValue;
		} else if (lastValueRef > newValue && lastValueRef > lastValue) {
			lastValueRef = -1;
		}

		if (intervalRef) {
			clearInterval(intervalRef);
		}

		intervalRef = setInterval(() => {
			if (lastValueRef < newValue) {
				lastValueRef++
				setCurrentValue(lastValueRef)
			} else if (intervalRef) {
				clearInterval(intervalRef);
			}
		}, 20);
	};
	return letsCount;
};

export const ScorePoint = (props: { points: number }) => {
	const { points } = props;
	const [lastPoint, setLastPoint] = useState(points);
	const [currentPoint, setCurrentPoint] = useState(points);
	const { current: letsCount } = useRef(makeLetsCountInstance());
	useEffect(() => {
		letsCount(lastPoint, points, (currentPoint: SetStateAction<number>) => setCurrentPoint(currentPoint));
		setLastPoint(points);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastPoint, points]);
	
	return (
		<Points>{currentPoint}</Points>
	);
}

export default ScorePoint